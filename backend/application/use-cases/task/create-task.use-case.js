const TaskEntity = require("backend/domain/entities/task.entity");

class CreateTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * create a new task
     * @param {import("backend/application/dtos/task.dto").CreateTaskDto} taskData
     * @param {string} userId
     * @returns {Promise<TaskEntity>}
     */

    async execute(taskData, userId) {
        const taskEntity = new TaskEntity({
            title: taskData.title,
            description: taskData.description,
            status: taskData.status,
            priority: taskData.priority,
            duration: taskData.dueDate,
            userId: userId
        });

        return this.taskRepository.create(taskEntity);
    }
}

module.exports = CreateTaskUseCase;
