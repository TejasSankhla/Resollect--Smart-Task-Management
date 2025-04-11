import React, { useState } from "react";
import { Task, TaskStatus } from "../api/task/types";

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "_id" | "createdAt" | "updatedAt">) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !deadline) return;

    onSubmit({
      title,
      description,
      deadline: new Date(deadline).toISOString(),
      status: TaskStatus.ONGOING,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setDeadline("");
    setIsExpanded(false);
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          w-full text-left px-6 py-4 rounded-lg
          bg-white dark:bg-gray-800 shadow-sm
          hover:shadow-md transition-all duration-200
          border border-gray-200 dark:border-gray-700
          ${isExpanded ? "rounded-b-none border-b-0" : ""}
        `}
      >
        <div className="flex items-center">
          <svg
            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
              isExpanded ? "transform rotate-45" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="ml-2 text-gray-600 dark:text-gray-300">
            {isExpanded ? "Cancel" : "Add New Task"}
          </span>
        </div>
      </button>

      {isExpanded && (
        <form
          onSubmit={handleSubmit}
          className="
            bg-white dark:bg-gray-800 rounded-b-lg
            border border-t-0 border-gray-200 dark:border-gray-700
            shadow-sm p-6 space-y-4
            animate-slideDown
          "
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                w-full px-4 py-2 rounded-lg
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-white
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                focus:border-transparent
                transition-colors duration-200
              "
              required
              maxLength={100}
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
                w-full px-4 py-2 rounded-lg
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-white
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                focus:border-transparent
                transition-colors duration-200
                resize-none
              "
              rows={3}
              maxLength={500}
              placeholder="Enter task description (optional)"
            />
          </div>

          <div>
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="
                w-full px-4 py-2 rounded-lg
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-white
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                focus:border-transparent
                transition-colors duration-200
              "
              required
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="
                px-6 py-2 rounded-lg
                bg-blue-600 hover:bg-blue-700
                text-white font-medium
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-colors duration-200
                flex items-center
              "
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
