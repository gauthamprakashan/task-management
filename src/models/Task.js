import mongoose from 'mongoose';

export const TaskStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

export const TaskPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

/*
TODO: Complete the Task schema
Requirements:
1. title: required string, trimmed
2. description: optional string
3. status: required, default to PENDING, validate against TaskStatus enum
4. priority: required, default to MEDIUM, validate against TaskPriority enum
5. userId: required ObjectId reference to User model
6. dueDate: optional Date
7. Add timestamps
8. Create compound index on userId and status for better query performance
*/

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.PENDING,
    required: true,
  },
  priority: {
    type: String,
    enum: Object.values(TaskPriority),
    default: TaskPriority.MEDIUM,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  dueDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

taskSchema.index({ userId: 1, status: 1 });

export const Task = mongoose.model('Task', taskSchema);
