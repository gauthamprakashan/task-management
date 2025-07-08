import Joi from 'joi';
// hint: reuse these enums for valid values
import { TaskStatus, TaskPriority } from '../models/Task.js';

export const userRegistrationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const taskCreationSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().max(500),
  status: Joi.string().valid(...Object.values(TaskStatus)),
  priority: Joi.string().valid(...Object.values(TaskPriority)),
  dueDate: Joi.date(),
});

export const taskUpdateSchema = Joi.object({
  title: Joi.string().min(1).max(100),
  description: Joi.string().max(500),
  status: Joi.string().valid(...Object.values(TaskStatus)),
  priority: Joi.string().valid(...Object.values(TaskPriority)),
  dueDate: Joi.date(),
});

export const taskQuerySchema = Joi.object({
  status: Joi.string().valid(...Object.values(TaskStatus)),
  priority: Joi.string().valid(...Object.values(TaskPriority)),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string().valid('createdAt', 'dueDate', 'priority', 'status').default('createdAt'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
  search: Joi.string().allow(''),
});
