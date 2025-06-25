import Joi from 'joi';
// hint: reuse these enums for valid values
import { TaskStatus, TaskPriority } from '../models/Task.js';

export const userRegistrationSchema = Joi.object({
  /*TODO: Add required name with length constraints 
          Add required valid email
          Add required password with minimum length */
});

export const userLoginSchema = Joi.object({
/*TODO: Add required email
        Add required password */
});

export const taskCreationSchema = Joi.object({
  /* TODO: Add required title 
           Add optional description 
           Add optional status, valid against TaskStatus 
           Add optional priority, valid against TaskPriority 
           Add optional dueDate (date) */
});

export const taskUpdateSchema = Joi.object({
  /** TODO: Same fields as creation but all optional */
});

export const taskQuerySchema = Joi.object({
  /** TODO: Optional status, valid against TaskStatus 
            Optional priority, valid against TaskPriority 
            Optional page, integer >= 1 
            Optional limit, integer with max limit 
            Optional sortBy with allowed fields 
            Optional sortOrder: 'asc' or 'desc' */
});
