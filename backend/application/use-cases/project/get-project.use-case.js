class GetProjectUseCase {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  /**
   * Get a project by ID
   * @param {string} projectId
   * @returns {Promise<import('../../../domain/entities/project.entity')>}
   */
  async execute(projectId) {
    const projectEntity = await this.projectRepository.findById(projectId);

    if (!projectEntity) {
      const error = new Error('Project not found');
      error.statusCode = 404;
      throw error;
    }

    return projectEntity;
  }
}

module.exports = GetProjectUseCase;
