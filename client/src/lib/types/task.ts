export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status: Task['status'];
  priority: Task['priority'];
  dueDate?: string;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  id: string;
}
