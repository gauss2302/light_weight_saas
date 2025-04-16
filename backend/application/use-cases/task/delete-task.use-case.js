class DeleteTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Delete a task
     * @param {string} taskId
     * @param {string} userId
     * @returns {Promise<boolean>}
     */
    async execute(taskId, userId) {
        const taskEntity = await this.taskRepository.findById(taskId);

        if (!taskEntity) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }

        // Use entity method to check access permissions
        if (!taskEntity.canBeAccessedBy(userId)) {
            const error = new Error('Unauthorized access to task');
            error.statusCode = 403;
            throw error;
        }

        return this.taskRepository.delete(taskId);
    }
}

module.exports = DeleteTaskUseCase;
