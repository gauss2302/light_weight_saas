const TaskEntity = require("../../../domain/entities/task.entity");
const ITaskRepository = require('../../../domain/interfaces/repositories/task-repository.interface');
const { Task } = require('backend/models/task');
class TaskRepository extends ITaskRepository {
    /**
     * Find task by ID
     * @param {string} id
     * @returns {Promise<TaskEntity|null>}
     */
    async findById(id) {
        const task = await Task.findByPk(id);
        if (!task) return null;

        return new TaskEntity({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate,
            userId: task.userId,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        });
    }

    /**
     * Find tasks by user ID
     * @param {string} userId
     * @returns {Promise<TaskEntity[]>}
     */
    async findByUserId(userId) {
        const tasks = await Task.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });

        return tasks.map(task => new TaskEntity({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate,
            userId: task.userId,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        }));
    }

    /**
     * Create new task
     * @param {TaskEntity} taskEntity
     * @returns {Promise<TaskEntity>}
     */
    async create(taskEntity) {
        const task = await Task.create({
            title: taskEntity.title,
            description: taskEntity.description,
            status: taskEntity.status,
            priority: taskEntity.priority,
            dueDate: taskEntity.dueDate,
            userId: taskEntity.userId,
        });

        return new TaskEntity({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate,
            userId: task.userId,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        });
    }

    /**
     * Update task
     * @param {string} id
     * @param {Partial<TaskEntity>} taskData
     * @returns {Promise<TaskEntity|null>}
     */
    async update(id, taskData) {
        const task = await Task.findByPk(id);
        if (!task) return null;

        await task.update(taskData);

        return new TaskEntity({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate,
            userId: task.userId,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        });
    }

    /**
     * Delete task
     * @param {string} id
     * @returns {Promise<boolean>}
     */
    async delete(id) {
        const task = await Task.findByPk(id);
        if (!task) return false;

        await task.destroy();
        return true;
    }
}

module.exports = TaskRepository;
