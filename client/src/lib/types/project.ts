export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  name: string;
  description?: string;
  status?: Project['status'];
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: string;
}
