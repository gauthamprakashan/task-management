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

// TODO: Implement GET /api/tasks - Get all tasks for authenticated user with filters and pagination
router.get("/", async (req, res) => {
  try {
    /*
     TODO: Validate query parameters using taskQuerySchema
     Expected query params: { status?, priority?, page?, limit?, sortBy?, sortOrder?, search? }
     Use taskQuerySchema.validate(req.query) with Joi
     If validation fails, return proper status code with error message
    
     TODO: Extract and set default values for pagination and filtering
     Get page default: 1, limit default: 10 from validated query
     Get status, priority, sortBy 'createdAt', sortOrder 'desc'
     Get search term for title/description search
    
     TODO: Build database query conditions
     Create filter object with userId: req.user.id (always required)
     Add status filter if provided: status: queryParams.status
     Add priority filter if provided: priority: queryParams.priority
     Add search functionality for title and description if search term provided
    
     TODO: Execute database query with pagination and sorting
     Calculate skip value and paginate things
     Apply sorting: sortOrder 'asc' or 'des'
     Get total count for pagination with same filters
    
     TODO: Send paginated response
     Response format: {
       tasks: Task[](array),
       pagination: {
         total: number,
         page: number,
         pages: Math.ceil(total / limit),
         limit: number
       }
     }
     */
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: "Internal server error" });
    }
    console.log(error);
  }
});

// TODO: Implement GET /api/tasks/:id - Get specific task by ID
router.get("/:id", async (req, res) => {
  try {
    /*
     TODO: Extract and validate task ID
     Get taskId from req.params.id
     Validate if it's a valid MongoDB ObjectId format
     If invalid format, return appropriate status with error message

     TODO: Find task by ID and user from the db
     ensure user can only access their own tasks

     TODO: Check if task exists
     If task not found, return appropriate status code with message: "Task not found"

     TODO: Return the task
     Send appropriate status with task data: { task: foundedTask }
    */
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: "Internal server error" });
    }
    console.log(error);
  }
});

// TODO: Implement POST /api/tasks - Create new task
router.post("/", async (req, res) => {
  try {
    /*
     TODO: Validate request body using taskCreationSchema
     Expected req.body format: { title: string, description?: string, status?: TaskStatus, priority?: TaskPriority, dueDate?: Date }
     Use taskCreationSchema for validating request body with Joi

     If validation fails, return appropriate status with validation error details
     TODO: Extract validated data and set defaults

     Get title, description, status, priority, dueDate from validated body
     Set default values: status = TaskStatus.PENDING, priority = TaskPriority.MEDIUM (if not provided)

     TODO: Create task data object
     Create taskData with:
     - title: from request
     - description: from request (optional)
     - status: from request or default
     - priority: from request or default
     - dueDate: from request (optional)
     - userId: req.user.id (always required)
     - createdAt: new Date()
     - updatedAt: new Date()

     TODO: Save task to database
     Use Task schema to store

     TODO: Return created task
     Send appropriate status with created task: { task: createdTask }
     */
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: "Internal server error" });
    }
    console.log(error);
  }
});

// TODO: Implement PUT /api/tasks/:id - Update existing task
router.put("/:id", async (req, res) => {
  try {
    /*
     TODO: Extract and validate task ID
     Get taskId from req.params.id
     Validate if it's a valid MongoDB ObjectId format
     If invalid format, return appropriate status with error message

     TODO: Validate request body using taskUpdateSchema
     Expected req.body format: { title?: string, description?: string, status?: TaskStatus, priority?: TaskPriority, dueDate?: Date }
     Use taskUpdateSchema.validate(req.body) with Joi
     If validation fails, return appropriate status with validation error details

     TODO: Find and check if task exists and belongs to user
     If task not found, return appropriate status with message: "Task not found"

     TODO: Update task with provided fields only
     Create updateData object with validated fields
     Add updatedAt to updateData
     return updated document

     TODO: Return updated task
     Send appropriate status with updated task: { task: updatedTask }
    */
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: "Internal server error" });
    }
    console.log(error);
  }
});

// TODO: Implement DELETE /api/tasks/:id - Delete task
router.delete("/:id", async (req, res) => {
  try {
    /*
     TODO: Extract and validate task ID
     Get taskId from req.params.id
     Validate if it's a valid MongoDB ObjectId format
     If invalid format, return appropriate status with error message

     TODO: Find and delete task on db 
     This ensures user can only delete their own tasks

     TODO: Check if task was found and deleted
     If no task was deleted (result is null), return appropriate status with message: "Task not found"

     TODO: Return success message
     Send appropriate status with success message: { message: "Task deleted successfully" }
     */
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: "Internal server error" });
    }
    console.log(error);
  }
});

// TODO: Implement GET /api/tasks/stats/summary - Get task statistics for authenticated user
router.get("/stats/summary", async (req, res) => {
  try {
    /*
     TODO: Get counts by status
     Count tasks for each status:
     - pending: count where userId = req.user.id AND status = TaskStatus.PENDING
     - inProgress: count where userId = req.user.id AND status = TaskStatus.IN_PROGRESS
     - completed: count where userId = req.user.id AND status = TaskStatus.COMPLETED

     TODO: Get counts by priority
     Use Task Model to perform operation :
     - low: count where userId = req.user.id AND priority = TaskPriority.LOW
     - medium: count where userId = req.user.id AND priority = TaskPriority.MEDIUM
     - high: count where userId = req.user.id AND priority = TaskPriority.HIGH

     TODO: Get overdue tasks count
     Count tasks where userId = req.user.id AND dueDate < new Date() AND status != TaskStatus.COMPLETED

     TODO: Get total tasks count
     Count all tasks where userId = req.user.id

     TODO: Return statistics
     Send appropriate status with stats object:
     {
       statusCounts: { pending, inProgress, completed },
       priorityCounts: { low, medium, high },
       overdueTasks: number,
       totalTasks: number
     }
     */
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: "Internal server error" });
    }
    console.log(error);
  }
});

export { router as taskRoutes };
