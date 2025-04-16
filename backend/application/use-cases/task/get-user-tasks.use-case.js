class GetUserTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Get all tasks for a user
     * @param {string} userId
     * @returns {Promise<TaskEntity[]>}
     */

    async execute(userId) {
        return this.taskRepository.findByUserId(userId);
    }
}

module.exports = GetUserTaskUseCase;
