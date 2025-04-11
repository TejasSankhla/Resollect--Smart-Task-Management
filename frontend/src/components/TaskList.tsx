import React from "react";
import { Task } from "../api/task/types";
import { TaskCard } from "./TaskCard";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onStatusChange,
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceStatus = result.source.droppableId as Task["status"];
    const destinationStatus = result.destination.droppableId as Task["status"];
    const taskId = result.draggableId;

    if (sourceStatus !== destinationStatus) {
      onStatusChange(taskId, destinationStatus);
    }
  };

  const tasksByStatus = {
    ongoing: tasks.filter((task) => task.status === "ongoing"),
    success: tasks.filter((task) => task.status === "success"),
    failure: tasks.filter((task) => task.status === "failure"),
  };

  const statusConfig = {
    ongoing: {
      label: "In Progress",
      icon: (
        <svg
          className="w-5 h-5 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      containerClass: "border-blue-200 dark:border-blue-800",
      headerClass: "bg-blue-50 dark:bg-blue-900/30",
    },
    success: {
      label: "Completed",
      icon: (
        <svg
          className="w-5 h-5 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      containerClass: "border-green-200 dark:border-green-800",
      headerClass: "bg-green-50 dark:bg-green-900/30",
    },
    failure: {
      label: "Failed",
      icon: (
        <svg
          className="w-5 h-5 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      containerClass: "border-red-200 dark:border-red-800",
      headerClass: "bg-red-50 dark:bg-red-900/30",
    },
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
          <div
            key={status}
            className={`
              bg-white dark:bg-gray-800 rounded-lg shadow-sm
              border ${
                statusConfig[status as keyof typeof statusConfig].containerClass
              }
              transition-all duration-200 ease-in-out
              hover:shadow-md
            `}
          >
            <div
              className={`
              px-4 py-3 rounded-t-lg
              ${statusConfig[status as keyof typeof statusConfig].headerClass}
              border-b ${
                statusConfig[status as keyof typeof statusConfig].containerClass
              }
            `}
            >
              <div className="flex items-center space-x-2">
                {statusConfig[status as keyof typeof statusConfig].icon}
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {statusConfig[status as keyof typeof statusConfig].label}
                </h2>
                <span className="ml-auto text-sm font-medium text-gray-500 dark:text-gray-400">
                  {statusTasks.length}
                </span>
              </div>
            </div>
            <Droppable droppableId={status}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`
                    p-4 min-h-[200px] rounded-b-lg
                    transition-colors duration-200
                    ${
                      snapshot.isDraggingOver
                        ? "bg-gray-50 dark:bg-gray-700/50"
                        : ""
                    }
                  `}
                >
                  {statusTasks.map((task, index) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      index={index}
                      onDelete={onDelete}
                      onStatusChange={onStatusChange}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};
