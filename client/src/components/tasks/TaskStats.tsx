// src/components/tasks/TaskStats.tsx
'use client';

import { Task } from '@/lib/types/task';

interface TaskStatsProps {
  tasks: Task[];
}

export default function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'DONE').length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === 'IN_PROGRESS'
  ).length;
  const todoTasks = tasks.filter((task) => task.status === 'TODO').length;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === 'HIGH'
  ).length;

  const stats = [
    { name: 'Total Tasks', value: totalTasks, color: 'bg-blue-500' },
    { name: 'Completed', value: completedTasks, color: 'bg-green-500' },
    { name: 'In Progress', value: inProgressTasks, color: 'bg-yellow-500' },
    { name: 'To Do', value: todoTasks, color: 'bg-gray-500' },
    { name: 'High Priority', value: highPriorityTasks, color: 'bg-red-500' },
  ];

  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Task Overview</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.name} className="text-center">
            <div
              className={`text-2xl font-bold ${stat.color} mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full text-white`}
            >
              {stat.value}
            </div>
            <div className="text-sm text-gray-500">{stat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
