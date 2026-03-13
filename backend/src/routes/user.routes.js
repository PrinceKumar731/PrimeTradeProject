import { Router } from 'express';

import {
  getAdminSummary,
  getCurrentUser,
} from '../controllers/user.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const userRouter = Router();

userRouter.get('/me', authenticate, asyncHandler(getCurrentUser));
userRouter.get(
  '/admin-summary',
  authenticate,
  authorize('admin'),
  asyncHandler(getAdminSummary)
);

export { userRouter };
