class UpdateProjectUseCase {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  /**
   * Update a project
   * @param {string} projectId
   * @param {import('../../dtos/project.dto').UpdateProjectDto} projectData
   * @param {string} userId
   * @returns {Promise<import('../../../domain/entities/project.entity')>}
   */
  async execute(projectId, projectData, userId) {
    // First, get the existing project entity
    const existingProject = await this.projectRepository.findById(projectId);

    if (!existingProject) {
      const error = new Error('Project not found');
      error.statusCode = 404;
      throw error;
    }

    // Check if the user owns this project
    if (existingProject.userId !== userId) {
      const error = new Error('Unauthorized access to project');
      error.statusCode = 403;
      throw error;
    }

    // Validate status if provided
    if (projectData.status && !['ACTIVE', 'INACTIVE'].includes(projectData.status)) {
      const error = new Error('Invalid status value');
      error.statusCode = 400;
      throw error;
    }

    // Update the project
    return this.projectRepository.update(projectId, projectData);
  }
}

module.exports = UpdateProjectUseCase;
