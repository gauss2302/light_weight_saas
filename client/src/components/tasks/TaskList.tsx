'use client';

import React, { useState, useEffect } from 'react';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,

} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import api from '@/lib/api';
import { Task } from '@/lib/types/task';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import TaskStats from './TaskStats';
import TaskColumn from './TaskColumn';
import {
  restrictToWindowEdges,
  restrictToParentElement,
} from '@dnd-kit/modifiers';

const TASK_STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
} as const;

const COLUMN_TITLES = {
  [TASK_STATUS.TODO]: 'To Do',
  [TASK_STATUS.IN_PROGRESS]: 'In Progress',
  [TASK_STATUS.DONE]: 'Done',
} as const;

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get<Task[]>('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || !active) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    // Handle dropping on a column
    if (over.data.current?.type === 'column') {
      const newStatus = over.id as keyof typeof TASK_STATUS;
      if (activeTask.status === newStatus) return;

      // Keep original task for rollback
      const originalTask = { ...activeTask };

      try {
        // Optimistic update
        setTasks((prev) =>
          prev.map((task) =>
            task.id === activeTask.id ? { ...task, status: newStatus } : task
          )
        );

        const response = await api.put(`/tasks/${activeTask.id}`, {
          ...activeTask,
          status: newStatus,
        });

        // Update with server data
        setTasks((prev) =>
          prev.map((task) => (task.id === activeTask.id ? response.data : task))
        );
      } catch (error) {
        // Revert on error
        setTasks((prev) =>
          prev.map((task) => (task.id === activeTask.id ? originalTask : task))
        );
        console.error('Update failed:', error);
      }
    }
  };

  const handleTaskCreate = async (task: Task) => {
    try {
      const response = await api.post<Task>('/tasks', task);
      setTasks((prev) => [response.data, ...prev]);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleTaskUpdate = async (updatedTask: Task) => {
    try {
      const response = await api.put<Task>(
        `/tasks/${updatedTask.id}`,
        updatedTask
      );
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? response.data : task))
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const activeTask = tasks.find((task) => task.id === activeId);

  // Add custom modifiers for better drag experience
  const modifiers = [restrictToWindowEdges, restrictToParentElement];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      <TaskStats tasks={tasks} />

      {showForm && (
        <TaskForm
          onSubmit={handleTaskCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={modifiers}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Object.entries(TASK_STATUS).map(([, status]) => (
            <TaskColumn
              key={status}
              id={status}
              title={COLUMN_TITLES[status]}
              tasks={tasks.filter((t) => t.status === status)}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && (
            <div className="w-full rotate-3 transform opacity-80">
              <TaskCard
                task={activeTask}
                onUpdate={handleTaskUpdate}
                onDelete={handleTaskDelete}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
