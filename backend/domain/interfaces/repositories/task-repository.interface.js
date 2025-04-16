/**
 * @interface ITaskRepository
 */
class ITaskRepository {
    /**
     * @param {string} id
     * @returns {Promise<TaskEntity|null>}
     */
    findById(id) {
        throw new Error('Method not implemented');
    }

    /**
     * @param {string} userId
     * @returns {Promise<TaskEntity[]>}
     */
    findByUserId(userId) {
        throw new Error('Method not implemented');
    }

    /**
     * @param {Object} taskData
     * @returns {Promise<TaskEntity>}
     */
    create(taskData) {
        throw new Error('Method not implemented');
    }

    /**
     * @param {string} id
     * @param {Object} taskData
     * @returns {Promise<TaskEntity|null>}
     */
    update(id, taskData) {
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

module.exports = ITaskRepository;
