class DeleteProjectUseCase {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  /**
   * Delete a project
   * @param {string} projectId
   * @param {string} userId
   * @returns {Promise<boolean>}
   */
  async execute(projectId, userId) {
    // First, get the project entity
    const projectEntity = await this.projectRepository.findById(projectId);

    if (!projectEntity) {
      const error = new Error('Project not found');
      error.statusCode = 404;
      throw error;
    }

    // Check if the user owns this project
    if (projectEntity.userId !== userId) {
      const error = new Error('Unauthorized access to project');
      error.statusCode = 403;
      throw error;
    }

    // Delete the project
    return this.projectRepository.delete(projectId);
  }
}

module.exports = DeleteProjectUseCase;
