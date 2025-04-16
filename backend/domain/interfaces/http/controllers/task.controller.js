class TaskController {
    constructor(
        createTaskUseCase,
        getUserTasksUseCase,
        getTaskUseCase,
        updateTaskUseCase,
        deleteTaskUseCase
    ) {
        this.createTaskUseCase = createTaskUseCase;
        this.getUserTasksUseCase = getUserTasksUseCase;
        this.getTaskUseCase = getTaskUseCase;
        this.updateTaskUseCase = updateTaskUseCase;
        this.deleteTaskUseCase = deleteTaskUseCase;
    }

    /**
     * Create a new task
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    async create(req, res, next) {
        try {
            const taskData = req.body;
            const userId = req.user.userId;

            const task = await this.createTaskUseCase.execute(taskData, userId);

            res.status(201).json(task);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get all tasks for current user
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    async getUserTasks(req, res, next) {
        try {
            const userId = req.user.userId;

            const tasks = await this.getUserTasksUseCase.execute(userId);

            res.json(tasks);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get task by ID
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    async getById(req, res, next) {
        try {
            const taskId = req.params.id;
            const userId = req.user.userId;

            const task = await this.getTaskUseCase.execute(taskId, userId);

            res.json(task);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update a task
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    async update(req, res, next) {
        try {
            const taskId = req.params.id;
            const taskData = req.body;
            const userId = req.user.userId;

            const task = await this.updateTaskUseCase.execute(taskId, taskData, userId);

            res.json(task);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete a task
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    async delete(req, res, next) {
        try {
            const taskId = req.params.id;
            const userId = req.user.userId;

            await this.deleteTaskUseCase.execute(taskId, userId);

            res.json({ message: 'Task deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = TaskController;
