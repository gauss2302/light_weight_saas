class UpdateTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Update a task
     * @param {string} taskId
     * @param {import('../../dtos/task.dto').UpdateTaskDto} taskData
     * @param {string} userId
     * @returns {Promise<TaskEntity>}
     */
    async execute(taskId, taskData, userId) {
        // Get the existing task entity
        const existingTaskEntity = await this.taskRepository.findById(taskId);

        if (!existingTaskEntity) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }

        // Use entity method to check access permissions
        if (!existingTaskEntity.canBeAccessedBy(userId)) {
            const error = new Error('Unauthorized access to task');
            error.statusCode = 403;
            throw error;
        }

        // Validate status
        if (taskData.status && !['TODO', 'IN_PROGRESS', 'DONE'].includes(taskData.status)) {
            const error = new Error('Invalid status value');
            error.statusCode = 400;
            throw error;
        }

        // Validate priority
        if (taskData.priority && !['LOW', 'MEDIUM', 'HIGH'].includes(taskData.priority)) {
            const error = new Error('Invalid priority value');
            error.statusCode = 400;
            throw error;
        }

        // Update and return the entity
        return this.taskRepository.update(taskId, taskData);
    }
}

module.exports = UpdateTaskUseCase;
