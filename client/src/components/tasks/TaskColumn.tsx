'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '@/lib/types/task';
import SortableTaskCard from './SortableTaskCard';

interface TaskColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskColumn({
  id,
  title,
  tasks,
  onUpdate,
  onDelete,
}: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: {
      type: 'column',
      status: id,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[200px] rounded-lg bg-gray-50 p-4 transition-colors ${
        isOver ? 'bg-blue-50 ring-2 ring-blue-200' : ''
      }`}
    >
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        {title} ({tasks.length})
      </h3>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
