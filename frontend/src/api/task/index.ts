import axios from "axios";
import { Task } from "./types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

export const TaskAPI = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get("/tasks");
    return response.data as Task[];
  },

  // Get task by ID
  getTaskById: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data as Task;
  },

  // Create new task
  createTask: async (
    task: Omit<Task, "_id" | "createdAt" | "updatedAt">
  ): Promise<Task> => {
    const response = await api.post("/tasks", task);
    return response.data as Task;
  },

  // Update task
  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data as Task;
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  // Update task status
  updateTaskStatus: async (
    id: string,
    status: Task["status"]
  ): Promise<Task> => {
    const response = await api.patch(`/tasks/${id}/status`, { status });
    return response.data as Task;
  },
};
