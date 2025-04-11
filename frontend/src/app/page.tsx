"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskAPI } from "@/api/task";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { Task } from "@/api/task/types";

export default function Home() {
  const queryClient = useQueryClient();

  // Fetch tasks
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: TaskAPI.getAllTasks,
  });

  // Create task mutation
  const createTask = useMutation({
    mutationFn: TaskAPI.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Delete task mutation
  const deleteTask = useMutation({
    mutationFn: TaskAPI.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Update task status mutation
  const updateTaskStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Task["status"] }) =>
      TaskAPI.updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Smart Todo List</h1>
          <p className="text-gray-600 mt-2">
            Manage your tasks with automatic time-based status updates
          </p>
        </header>

        <TaskForm
          onSubmit={(task) => {
            createTask.mutate(task);
          }}
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onDelete={(id) => deleteTask.mutate(id)}
            onStatusChange={(id, status) =>
              updateTaskStatus.mutate({ id, status })
            }
          />
        )}
      </div>
    </main>
  );
}
