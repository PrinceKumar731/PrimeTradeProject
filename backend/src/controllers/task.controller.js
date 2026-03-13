import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from '../services/task.service.js';

export const createTaskHandler = async (req, res) => {
  const task = await createTask(req.body, req.user);

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task,
  });
};

export const getTasksHandler = async (req, res) => {
  const result = await getTasks(req.query, req.user);

  res.status(200).json({
    success: true,
    message: 'Tasks fetched successfully',
    data: result.tasks,
    meta: result.pagination,
  });
};

export const getTaskByIdHandler = async (req, res) => {
  const task = await getTaskById(req.params.taskId, req.user);

  res.status(200).json({
    success: true,
    message: 'Task fetched successfully',
    data: task,
  });
};

export const updateTaskHandler = async (req, res) => {
  const task = await updateTask(req.params.taskId, req.body, req.user);

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: task,
  });
};

export const deleteTaskHandler = async (req, res) => {
  await deleteTask(req.params.taskId, req.user);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
  });
};
