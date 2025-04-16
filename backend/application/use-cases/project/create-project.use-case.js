const ProjectEntity = require('../../../domain/entities/project.entity');

class CreateProjectUseCase {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  /**
   * Create a new project
   * @param {import('../../dtos/project.dto').CreateProjectDto} projectData
   * @param {string} userId
   * @returns {Promise<ProjectEntity>}
   */
  async execute(projectData, userId) {
    // Create project entity
    const projectEntity = new ProjectEntity({
      name: projectData.name,
      description: projectData.description,
      status: projectData.status || 'ACTIVE',
      userId: userId
    });

    return this.projectRepository.create(projectEntity);
  }
}

module.exports = CreateProjectUseCase;
