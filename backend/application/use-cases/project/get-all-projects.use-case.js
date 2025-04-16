class GetAllProjectsUseCase {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  /**
   * Get all projects
   * @returns {Promise<import('../../../domain/entities/project.entity')[]>}
   */
  async execute() {
    return this.projectRepository.findAll();
  }
}

module.exports = GetAllProjectsUseCase;
