import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';
import { validationResult } from 'express-validator';

export class TaskController {
  // Get all tasks
  static async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await TaskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  // Get task by ID
  static async getTaskById(req: Request, res: Response) {
    try {
      const task = await TaskService.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  }

  // Create new task
  static async createTask(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = await TaskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  // Update task
  static async updateTask(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = await TaskService.updateTask(req.params.id, req.body);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  }

  // Delete task
  static async deleteTask(req: Request, res: Response) {
    try {
      const task = await TaskService.deleteTask(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }

  // Update task status
  static async updateTaskStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;
      if (!['ongoing', 'success', 'failure'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const task = await TaskService.updateTaskStatus(req.params.id, status);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task status' });
    }
  }
} 