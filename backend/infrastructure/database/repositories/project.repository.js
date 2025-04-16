const IProjectRepository = require('../../../domain/interfaces/repositories/project-repository.interface');
const { Project } = require('../../../models/project');
const ProjectEntity = require('../../../domain/entities/project.entity');

class ProjectRepository extends IProjectRepository {
    /**
     * Find all projects
     * @returns {Promise<ProjectEntity[]>}
     */
    async findAll() {
        const projects = await Project.findAll();

        return projects.map(project => new ProjectEntity({
            id: project.id,
            name: project.name,
            description: project.description,
            status: project.status,
            userId: project.userId,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
        }));
    }

    /**
     * Find project by ID
     * @param {string} id
     * @returns {Promise<ProjectEntity|null>}
     */
    async findById(id) {
        const project = await Project.findByPk(id);
        if (!project) return null;

        return new ProjectEntity({
            id: project.id,
            name: project.name,
            description: project.description,
            status: project.status,
            userId: project.userId,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
        });
    }

    /**
     * Find projects by user ID
     * @param {string} userId
     * @returns {Promise<ProjectEntity[]>}
     */
    async findByUserId(userId) {
        const projects = await Project.findAll({
            where: { userId },
        });

        return projects.map(project => new ProjectEntity({
            id: project.id,
            name: project.name,
            description: project.description,
            status: project.status,
            userId: project.userId,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
        }));
    }

    /**
     * Create new project
     * @param {ProjectEntity} projectEntity
     * @returns {Promise<ProjectEntity>}
     */
    async create(projectEntity) {
        const project = await Project.create({
            name: projectEntity.name,
            description: projectEntity.description,
            status: projectEntity.status,
            userId: projectEntity.userId,
        });

        return new ProjectEntity({
            id: project.id,
            name: project.name,
            description: project.description,
            status: project.status,
            userId: project.userId,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
        });
    }

    /**
     * Update project
     * @param {string} id
     * @param {Partial<ProjectEntity>} projectData
     * @returns {Promise<ProjectEntity|null>}
     */
    async update(id, projectData) {
        const project = await Project.findByPk(id);
        if (!project) return null;

        await project.update(projectData);

        return new ProjectEntity({
            id: project.id,
            name: project.name,
            description: project.description,
            status: project.status,
            userId: project.userId,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
        });
    }

    /**
     * Delete project
     * @param {string} id
     * @returns {Promise<boolean>}
     */
    async delete(id) {
        const project = await Project.findByPk(id);
        if (!project) return false;

        await project.destroy();
        return true;
    }
}

module.exports = ProjectRepository;
