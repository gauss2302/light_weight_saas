'use client';

import { useState } from 'react';
import { Project, CreateProjectInput } from '@/lib/types/project';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (project: Project) => void;
  onCancel: () => void;
}

export default function ProjectForm({
  project,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [formData, setFormData] = useState<CreateProjectInput>({
    name: project?.name ?? '', // Use nullish coalescing
    description: project?.description ?? '', // Use nullish coalescing
    status: project?.status ?? 'ACTIVE', // Use nullish coalescing
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure all required fields are present
    const projectData = {
      ...formData,
      id: project?.id ?? '', // Add id if it exists
      createdAt: project?.createdAt ?? new Date().toISOString(),
      updatedAt: project?.updatedAt ?? new Date().toISOString(),
    } as Project;

    onSubmit(projectData);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-4 shadow">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                status: e.target.value as Project['status'],
              }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            {project ? 'Update' : 'Create'} Project
          </button>
        </div>
      </div>
    </form>
  );
}
