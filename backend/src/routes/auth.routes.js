import { Router } from 'express';

import { login, register } from '../controllers/auth.controller.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { loginValidator, registerValidator } from '../validators/auth.validator.js';

const authRouter = Router();

authRouter.post('/register', registerValidator, validateRequest, asyncHandler(register));
authRouter.post('/login', loginValidator, validateRequest, asyncHandler(login));

export { authRouter };
