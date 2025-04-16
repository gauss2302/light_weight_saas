'use client';

import { useState } from 'react';
import { Task } from '@/lib/types/task';
import TaskForm from './TaskForm';

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dragHandleProps?: any;
}

export default function TaskCard({
  task,
  onUpdate,
  onDelete,
  dragHandleProps,
}: TaskCardProps) {
  const [editing, setEditing] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const priorityColors = {
    LOW: 'bg-gray-100 text-gray-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-red-100 text-red-800',
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmDelete(true);
  };

  if (editing) {
    return (
      <TaskForm
        task={task}
        onSubmit={(updatedTask) => {
          onUpdate(updatedTask);
          setEditing(false);
        }}
        onCancel={() => setEditing(false)}
      />
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Drag Handle */}
      <div
        {...dragHandleProps}
        className="cursor-move border-b border-gray-100 p-2"
      >
        <div className="flex justify-center">
          <svg
            className="h-6 w-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>
      </div>

      <div className="p-4">
        {/* Task Header */}
        <div className="flex items-start justify-between">
          <h3 className="flex-grow break-words text-lg font-semibold text-gray-900">
            {task.title}
          </h3>
          <div className="ml-2 flex items-center space-x-2">
            <button
              onClick={handleEditClick}
              className="rounded p-1 text-blue-600 hover:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button
              onClick={handleDeleteClick}
              className="rounded p-1 text-red-600 hover:text-red-800"
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

        {/* Task Description */}
        {task.description && (
          <p className="my-2 break-words text-sm text-gray-600">
            {task.description}
          </p>
        )}

        {/* Task Metadata */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${priorityColors[task.priority]}`}
          >
            {task.priority} Priority
          </span>
          {task.dueDate && (
            <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      {showConfirmDelete && (
        <div className="border-t border-red-100 bg-red-50 p-4">
          <p className="mb-3 text-sm text-red-600">
            Are you sure you want to delete this task?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirmDelete(false);
              }}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
              className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
