const path = require('path');

// Get the base path
const basePath = path.resolve(__dirname, '../../../..');
const TaskEntity = require(path.join(basePath, 'backend', 'domain', 'entities', 'task.entity'));

class CreateTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Create a new task
     * @param {Object} taskData - Task creation data
     * @param {string} userId - User ID
     * @returns {Promise<TaskEntity>}
     */
    async execute(taskData, userId) {
        const taskEntity = new TaskEntity({
            title: taskData.title,
            description: taskData.description,
            status: taskData.status || 'TODO',
            priority: taskData.priority || 'MEDIUM',
            dueDate: taskData.dueDate,
            userId: userId
        });

        return this.taskRepository.create(taskEntity);
    }
}

module.exports = CreateTaskUseCase;
