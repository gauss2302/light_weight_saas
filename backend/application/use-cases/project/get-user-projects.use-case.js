class GetUserProjectsUseCase {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  /**
   * Get all projects for a user
   * @param {string} userId
   * @returns {Promise<import('../../../domain/entities/project.entity')[]>}
   */
  async execute(userId) {
    return this.projectRepository.findByUserId(userId);
  }
}

module.exports = GetUserProjectsUseCase;
