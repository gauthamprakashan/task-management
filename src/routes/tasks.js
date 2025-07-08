import express from "express";
import { Task, TaskStatus, TaskPriority } from "../models/Task.js";
import { authenticate } from "../middleware/auth.js";
import {
  taskCreationSchema,
  taskUpdateSchema,
  taskQuerySchema,
} from "../utils/validation.js";

/*
 NOTE:  Please check the types defined in your types that will evaluate your TypeScript knowledge.
 NOTE: Carefully review all imported modules and how they are used in the code.
        Understand the logic and context before making any changes.
        This ensures that any modifications you make are accurate and consistent.
*/

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// GET /api/tasks - Get all tasks for authenticated user with filters and pagination
router.get("/", async (req, res) => {
  try {
    // Validate query parameters
    const { error, value: queryParams } = taskQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // Extract and set default values
    const page = parseInt(queryParams.page, 10) || 1;
    const limit = parseInt(queryParams.limit, 10) || 10;
    const status = queryParams.status;
    const priority = queryParams.priority;
    const sortBy = queryParams.sortBy || "createdAt";
    const sortOrder = queryParams.sortOrder === "asc" ? 1 : -1;
    const search = queryParams.search;
    // Build query
    const filter = { userId: req.user.id };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    // Pagination and sorting
    const skip = (page - 1) * limit;
    const tasks = await Task.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    const total = await Task.countDocuments(filter);
    res.json({
      tasks,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
});

// GET /api/tasks/:id - Get specific task by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid task ID format" });
    }
    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ task });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
});

// POST /api/tasks - Create new task
router.post("/", async (req, res) => {
  try {
    const { error, value } = taskCreationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const taskData = {
      ...value,
      status: value.status || TaskStatus.PENDING,
      priority: value.priority || TaskPriority.MEDIUM,
      userId: req.user.id,
    };
    const createdTask = await Task.create(taskData);
    res.status(201).json({ task: createdTask });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
});

// PUT /api/tasks/:id - Update existing task
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid task ID format" });
    }
    const { error, value } = taskUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updateData = { ...value, updatedAt: new Date() };
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updateData,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
});

// DELETE /api/tasks/:id - Delete task
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid task ID format" });
    }
    const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
});

// GET /api/tasks/stats/summary - Get task statistics for authenticated user
router.get("/stats/summary", async (req, res) => {
  try {
    const userId = req.user.id;
    const [pending, inProgress, completed, high, medium, low, overdue, total] = await Promise.all([
      Task.countDocuments({ userId, status: TaskStatus.PENDING }),
      Task.countDocuments({ userId, status: TaskStatus.IN_PROGRESS }),
      Task.countDocuments({ userId, status: TaskStatus.COMPLETED }),
      Task.countDocuments({ userId, priority: TaskPriority.HIGH }),
      Task.countDocuments({ userId, priority: TaskPriority.MEDIUM }),
      Task.countDocuments({ userId, priority: TaskPriority.LOW }),
      Task.countDocuments({ userId, dueDate: { $lt: new Date() }, status: { $ne: TaskStatus.COMPLETED } }),
      Task.countDocuments({ userId }),
    ]);
    res.json({
      status: { pending, inProgress, completed },
      priority: { high, medium, low },
      overdue,
      total,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
});

export { router as taskRoutes };
