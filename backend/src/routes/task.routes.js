import { Router } from 'express';

import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskByIdHandler,
  getTasksHandler,
  updateTaskHandler,
} from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  createTaskValidator,
  taskIdValidator,
  taskListValidator,
  updateTaskValidator,
} from '../validators/task.validator.js';

const taskRouter = Router();

taskRouter.use(authenticate);

taskRouter
  .route('/')
  .get(taskListValidator, validateRequest, asyncHandler(getTasksHandler))
  .post(createTaskValidator, validateRequest, asyncHandler(createTaskHandler));
taskRouter
  .route('/:taskId')
  .get(taskIdValidator, validateRequest, asyncHandler(getTaskByIdHandler))
  .put(updateTaskValidator, validateRequest, asyncHandler(updateTaskHandler))
  .delete(taskIdValidator, validateRequest, asyncHandler(deleteTaskHandler));

export { taskRouter };
