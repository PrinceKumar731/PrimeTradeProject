import mongoose from 'mongoose';

import { Task } from '../models/task.model.js';
import { ApiError } from '../utils/ApiError.js';

const buildTaskScope = (user) => {
  if (user.role === 'admin') {
    return {};
  }

  return { userId: user._id };
};

const ensureValidTaskId = (taskId) => {
  if (!mongoose.isValidObjectId(taskId)) {
    throw new ApiError(400, 'Invalid task id');
  }
};

const sanitizeTaskPayload = ({ title, description, status }) => ({
  ...(title !== undefined && { title }),
  ...(description !== undefined && { description }),
  ...(status !== undefined && { status }),
});

export const createTask = async (payload, user) => {
  if (!payload.title) {
    throw new ApiError(400, 'Title is required');
  }

  const task = await Task.create({
    ...sanitizeTaskPayload(payload),
    userId: user._id,
  });

  return task;
};

export const getTasks = async (query, user) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;

  const filters = {
    ...buildTaskScope(user),
    ...(query.status && { status: query.status }),
  };

  const [tasks, total] = await Promise.all([
    Task.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Task.countDocuments(filters),
  ]);

  return {
    tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

export const getTaskById = async (taskId, user) => {
  ensureValidTaskId(taskId);

  const task = await Task.findOne({
    _id: taskId,
    ...buildTaskScope(user),
  });

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  return task;
};

export const updateTask = async (taskId, payload, user) => {
  ensureValidTaskId(taskId);

  const updates = sanitizeTaskPayload(payload);

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, 'At least one task field is required for update');
  }

  const task = await Task.findOneAndUpdate(
    {
      _id: taskId,
      ...buildTaskScope(user),
    },
    updates,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  return task;
};

export const deleteTask = async (taskId, user) => {
  ensureValidTaskId(taskId);

  const task = await Task.findOneAndDelete({
    _id: taskId,
    ...buildTaskScope(user),
  });

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }
};
