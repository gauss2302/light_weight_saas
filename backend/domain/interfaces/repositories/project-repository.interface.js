/**
 * @interface IProjectRepository
 */
class IProjectRepository {
    /**
     * @returns {Promise<ProjectEntity[]>}
     */
    findAll() {
        throw new Error('Method not implemented');
    }

    /**
     * @param {string} id
     * @returns {Promise<ProjectEntity|null>}
     */
    findById(id) {
        throw new Error('Method not implemented');
    }

    /**
     * @param {string} userId
     * @returns {Promise<ProjectEntity[]>}
     */
    findByUserId(userId) {
        throw new Error('Method not implemented');
    }

    /**
     * @param {Object} projectData
     * @returns {Promise<ProjectEntity>}
     */
    create(projectData) {
        throw new Error('Method not implemented');
    }

    /**
     * @param {string} id
     * @param {Object} projectData
     * @returns {Promise<ProjectEntity|null>}
     */
    update(id, projectData) {
        throw new Error('Method not implemented');
    }

    /**
     * @param {string} id
     * @returns {Promise<boolean>}
     */
    delete(id) {
        throw new Error('Method not implemented');
    }
}

module.exports = IProjectRepository;
