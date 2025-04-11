import React from "react";
import { formatDistanceToNow, isPast } from "date-fns";
import { Task, TaskStatus } from "../api/task/types";
import { Draggable } from "@hello-pangea/dnd";

interface TaskCardProps {
  task: Task;
  index: number;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  index,
  onDelete,
  onStatusChange,
}) => {
  const deadline = new Date(task.deadline);
  const timeLeft = formatDistanceToNow(deadline, { addSuffix: true });
  const isOverdue = isPast(deadline) && task.status === "ongoing";

  const statusColors = {
    ongoing:
      "bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700",
    success:
      "bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700",
    failure: "bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-700",
  };

  const statusTextColors = {
    ongoing: "text-blue-700 dark:text-blue-300",
    success: "text-green-700 dark:text-green-300",
    failure: "text-red-700 dark:text-red-300",
  };

  const statusBadgeColors = {
    ongoing: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    success:
      "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
    failure: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            group relative rounded-lg border p-4 mb-3
            transition-all duration-200 ease-in-out
            ${statusColors[task.status]}
            ${
              snapshot.isDragging
                ? "rotate-[2deg] scale-105 shadow-lg"
                : "hover:scale-[1.02]"
            }
            ${isOverdue ? "animate-pulse" : ""}
          `}
        >
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {task.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  {task.description}
                </p>
              </div>
              <div className="flex items-start space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {task.status !== "success" && (
                  <button
                    onClick={() => onStatusChange(task._id, TaskStatus.SUCCESS)}
                    className="p-1.5 rounded-full text-green-600 hover:text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/50 transition-colors"
                    title="Mark as complete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
                <button
                  onClick={() => onDelete(task._id)}
                  className="p-1.5 rounded-full text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors"
                  title="Delete task"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusBadgeColors[task.status]
                }`}
              >
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
              <span
                className={`text-xs ${
                  isOverdue
                    ? "text-red-600 dark:text-red-400 font-medium"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {isOverdue ? "⚠ Overdue " : ""}
                {timeLeft}
              </span>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-lg bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-10 transition-opacity" />
        </div>
      )}
    </Draggable>
  );
};
