class GetTaskUseCase {
    constructor(taskRepository)
    {
        this.taskRepository = taskRepository;
    }

    /**
     * Get a task by ID
     * @param {string} taskId
     * @param {string} userId
     * @returns {Promise<TaskEntity>}
     */

    async execute(userId, taskId) {
        const taskEntity = await this.taskRepository.findById(taskId);

        if (!taskEntity) {
            const error = new Error('Task does not exist');
            error.status = 404;
            throw error;
        }

        if(!taskEntity.canBeAccessedBy(userId)){
            const error = new Error('Unauthorized access to task');
            error.statusCode = 403;
            throw error;
        }

        return taskEntity;
    }
}

module.exports = GetTaskUseCase;
