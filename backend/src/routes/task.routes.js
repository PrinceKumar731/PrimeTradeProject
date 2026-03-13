import { Router } from 'express';

import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskByIdHandler,
  getTasksHandler,
  updateTaskHandler,
} from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const taskRouter = Router();

taskRouter.use(authenticate);

taskRouter.route('/').get(asyncHandler(getTasksHandler)).post(asyncHandler(createTaskHandler));
taskRouter
  .route('/:taskId')
  .get(asyncHandler(getTaskByIdHandler))
  .put(asyncHandler(updateTaskHandler))
  .delete(asyncHandler(deleteTaskHandler));

export { taskRouter };
