'use client';

// src/app/(protected)/projects/page.tsx
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Project } from '@/lib/types/project';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectForm from '@/components/projects/ProjectForm';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get<Project[]>('/projects');
      setProjects(response.data);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreate = async (projectData: Project) => {
    try {
      const response = await api.post<Project>('/projects', projectData);
      setProjects((prev) => [response.data, ...prev]);
      setShowForm(false);
      setError(null);
    } catch (error) {
      console.error('Failed to create project:', error);
      setError('Failed to create project');
    }
  };

  const handleProjectUpdate = async (updatedProject: Project) => {
    try {
      const response = await api.put<Project>(
        `/projects/${updatedProject.id}`,
        updatedProject
      );
      setProjects((prev) =>
        prev.map((project) =>
          project.id === response.data.id ? response.data : project
        )
      );
      setError(null);
    } catch (error) {
      console.error('Failed to update project:', error);
      setError('Failed to update project');
    }
  };

  const handleProjectDelete = async (projectId: string) => {
    try {
      await api.delete(`/projects/${projectId}`);
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
      setError(null);
    } catch (error) {
      console.error('Failed to delete project:', error);
      setError('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          <button
            onClick={() => setShowForm(true)}
            className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Create Project
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {showForm && (
          <div className="mb-6">
            <ProjectForm
              onSubmit={handleProjectCreate}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onUpdate={handleProjectUpdate}
              onDelete={handleProjectDelete}
            />
          ))}
        </div>

        {projects.length === 0 && !showForm && (
          <div className="rounded-lg bg-gray-50 py-12 text-center">
            <p className="text-gray-500">
              No projects found. Create one to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
