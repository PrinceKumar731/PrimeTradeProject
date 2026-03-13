import { body, param, query } from 'express-validator';

import { taskStatuses } from '../models/task.model.js';

export const createTaskValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 120 })
    .withMessage('Title must be between 3 and 120 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(taskStatuses)
    .withMessage(`Status must be one of: ${taskStatuses.join(', ')}`),
];

export const updateTaskValidator = [
  param('taskId').isMongoId().withMessage('Task id must be a valid MongoDB id'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('Title must be between 3 and 120 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(taskStatuses)
    .withMessage(`Status must be one of: ${taskStatuses.join(', ')}`),
  body()
    .custom((value) => {
      const allowedFields = ['title', 'description', 'status'];
      const providedFields = Object.keys(value || {});

      if (providedFields.length === 0) {
        throw new Error('At least one task field is required for update');
      }

      const hasInvalidField = providedFields.some(
        (field) => !allowedFields.includes(field)
      );

      if (hasInvalidField) {
        throw new Error('Only title, description, and status can be updated');
      }

      return true;
    }),
];

export const taskIdValidator = [
  param('taskId').isMongoId().withMessage('Task id must be a valid MongoDB id'),
];

export const taskListValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('status')
    .optional()
    .isIn(taskStatuses)
    .withMessage(`Status must be one of: ${taskStatuses.join(', ')}`),
];
