import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import { swaggerServe, swaggerSetup } from './docs/swagger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { authRouter } from './routes/auth.routes.js';
import { healthRouter } from './routes/health.routes.js';
import { taskRouter } from './routes/task.routes.js';
import { userRouter } from './routes/user.routes.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (env.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

app.use('/api-docs', swaggerServe, swaggerSetup);
app.use(`/api/${env.apiVersion}/health`, healthRouter);
app.use(`/api/${env.apiVersion}/auth`, authRouter);
app.use(`/api/${env.apiVersion}/users`, userRouter);
app.use(`/api/${env.apiVersion}/tasks`, taskRouter);

app.use(notFound);
app.use(errorHandler);

export { app };
