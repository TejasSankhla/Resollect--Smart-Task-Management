import { Task, ITask } from '../models/Task';

export class TaskService {
  // Get all tasks
  static async getAllTasks(): Promise<ITask[]> {
    return Task.find().sort({ deadline: 1 });
  }

  // Get task by ID
  static async getTaskById(id: string): Promise<ITask | null> {
    return Task.findById(id);
  }

  // Create new task
  static async createTask(taskData: Partial<ITask>): Promise<ITask> {
    const task = new Task(taskData);
    return task.save();
  }

  // Update task
  static async updateTask(id: string, taskData: Partial<ITask>): Promise<ITask | null> {
    return Task.findByIdAndUpdate(id, taskData, { new: true, runValidators: true });
  }

  // Delete task
  static async deleteTask(id: string): Promise<ITask | null> {
    return Task.findByIdAndDelete(id);
  }

  // Update task status
  static async updateTaskStatus(id: string, status: 'ongoing' | 'success' | 'failure'): Promise<ITask | null> {
    return Task.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
  }

  // Check and update expired tasks
  static async updateExpiredTasks(): Promise<void> {
    const now = new Date();
    await Task.updateMany(
      {
        status: 'ongoing',
        deadline: { $lt: now }
      },
      {
        status: 'failure'
      }
    );
  }
} 