import { useEffect, useState } from 'react';

import { StatusCard } from '../components/StatusCard.jsx';
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from '../services/task.js';

const initialTaskForm = {
  title: '',
  description: '',
  status: 'pending',
};

const statusOptions = ['pending', 'in-progress', 'completed'];

const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.errors?.[0]?.message ||
    'Something went wrong. Please try again.'
  );
};

export function DashboardPage({ currentUser }) {
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState(initialTaskForm);
  const [filterStatus, setFilterStatus] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadTasks = async (status = filterStatus) => {
    setIsLoading(true);

    try {
      const payload = await fetchTasks({
        ...(status ? { status } : {}),
      });
      setTasks(payload.data);
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(filterStatus);
  }, [filterStatus]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setTaskForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setTaskForm(initialTaskForm);
    setEditingTaskId(null);
  };

  const handleTaskSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      if (editingTaskId) {
        await updateTask(editingTaskId, taskForm);
        setFeedback({
          type: 'success',
          message: 'Task updated successfully.',
        });
      } else {
        await createTask(taskForm);
        setFeedback({
          type: 'success',
          message: 'Task created successfully.',
        });
      }

      resetForm();
      await loadTasks(filterStatus);
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setTaskForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setFeedback(null);
  };

  const handleDelete = async (taskId) => {
    setFeedback(null);

    try {
      await deleteTask(taskId);
      setFeedback({
        type: 'success',
        message: 'Task deleted successfully.',
      });

      if (editingTaskId === taskId) {
        resetForm();
      }

      await loadTasks(filterStatus);
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error),
      });
    }
  };

  const completedCount = tasks.filter((task) => task.status === 'completed').length;

  return (
    <section className="dashboard-layout">
      <div className="dashboard-main">
        <div className="panel">
          <div className="panel__header">
            <p className="eyebrow">Protected Dashboard</p>
            <h2>Manage tasks with a minimal CRUD workflow.</h2>
            <p className="muted-text">
              {currentUser?.name
                ? `${currentUser.name} can create, update, filter, and delete tasks from this workspace.`
                : 'This dashboard is connected to the protected task API.'}
            </p>
          </div>

          <div className="dashboard-grid">
            <StatusCard label="Auth State" value="Active" tone="accent" />
            <StatusCard label="Signed In As" value={currentUser?.role || 'user'} />
            <StatusCard label="Visible Tasks" value={String(tasks.length)} />
            <StatusCard label="Completed" value={String(completedCount)} tone="accent" />
          </div>
        </div>

        <div className="panel">
          <div className="panel__header">
            <p className="eyebrow">{editingTaskId ? 'Edit Task' : 'Create Task'}</p>
            <h2>{editingTaskId ? 'Update an existing task.' : 'Add a new task.'}</h2>
          </div>

          {feedback && (
            <div className={`alert alert--${feedback.type}`}>{feedback.message}</div>
          )}

          <form className="task-form" onSubmit={handleTaskSubmit}>
            <label className="field">
              <span>Title</span>
              <input
                name="title"
                type="text"
                placeholder="Finish frontend integration"
                value={taskForm.title}
                onChange={handleFormChange}
                required
              />
            </label>

            <label className="field">
              <span>Description</span>
              <textarea
                name="description"
                rows="4"
                placeholder="Add task CRUD UI connected to the backend."
                value={taskForm.description}
                onChange={handleFormChange}
              />
            </label>

            <label className="field">
              <span>Status</span>
              <select name="status" value={taskForm.status} onChange={handleFormChange}>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <div className="form-actions">
              <button
                className="button button--primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? editingTaskId
                    ? 'Updating...'
                    : 'Creating...'
                  : editingTaskId
                    ? 'Update Task'
                    : 'Create Task'}
              </button>

              {editingTaskId && (
                <button
                  className="button button--ghost"
                  type="button"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <aside className="panel task-sidebar">
        <div className="panel__header">
          <p className="eyebrow">Task List</p>
          <h2>Filter and manage existing tasks.</h2>
        </div>

        <label className="field">
          <span>Status Filter</span>
          <select
            value={filterStatus}
            onChange={(event) => setFilterStatus(event.target.value)}
          >
            <option value="">All statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        {isLoading ? (
          <div className="placeholder-block">
            <p className="muted-text">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="placeholder-block">
            <p className="muted-text">
              No tasks found for the selected filter.
            </p>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <article className="task-card" key={task._id}>
                <div className="task-card__header">
                  <h3>{task.title}</h3>
                  <span className={`task-badge task-badge--${task.status}`}>
                    {task.status}
                  </span>
                </div>

                <p className="muted-text task-card__description">
                  {task.description || 'No description provided.'}
                </p>

                <div className="task-card__footer">
                  <button
                    className="button button--ghost button--small"
                    type="button"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="button button--ghost button--small"
                    type="button"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </aside>
    </section>
  );
}
