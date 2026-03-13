import mongoose from 'mongoose';

const taskStatuses = ['pending', 'in-progress', 'completed'];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    status: {
      type: String,
      enum: taskStatuses,
      default: 'pending',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Task owner is required'],
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, createdAt: -1 });

export const Task = mongoose.model('Task', taskSchema);
export { taskStatuses };
