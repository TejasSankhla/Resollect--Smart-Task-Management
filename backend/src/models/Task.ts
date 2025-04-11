import mongoose, { Document, Schema } from "mongoose";

export enum TaskStatus {
  ONGOING = "ongoing",
  SUCCESS = "success",
  FAILURE = "failure",
}

export interface ITask extends Document {
  title: string;
  description: string;
  deadline: Date;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    deadline: {
      type: Date,
      required: [true, "Deadline is required"],
    },
    status: {
      type: String,
      enum: TaskStatus,
      default: TaskStatus.ONGOING,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
TaskSchema.index({ status: 1, deadline: 1 });

export const Task = mongoose.model<ITask>("Task", TaskSchema);
