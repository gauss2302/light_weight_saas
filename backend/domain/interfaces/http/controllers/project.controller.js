class ProjectController {
    constructor(
      createProjectUseCase,
      getAllProjectsUseCase,
      getProjectUseCase,
      updateProjectUseCase,
      deleteProjectUseCase
    ) {
        this.createProjectUseCase = createProjectUseCase;
        this.getAllProjectsUseCase = getAllProjectsUseCase;
        this.getProjectUseCase = getProjectUseCase;
        this.updateProjectUseCase = updateProjectUseCase;
        this.deleteProjectUseCase = deleteProjectUseCase;
    }

    /**
     * Create a new project
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async create(req, res, next) {
        try {
            const projectData = req.body; // Now recognized as valid
            const userId = req.user.userId; // Assuming `req.user` is populated by middleware

            const project = await this.createProjectUseCase.execute(projectData, userId);

            res.status(201).json(project); // `status()` is now recognized
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get all projects
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    async getAll(req, res, next) {
        try {
            const projects = await this.getAllProjectsUseCase.execute();

            res.json(projects);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get project by ID
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    async getById(req, res, next) {
        try {
            const projectId = req.params.id;

            const project = await this.getProjectUseCase.execute(projectId);

            res.json(project);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update a project
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    async update(req, res, next) {
        try {
            const projectId = req.params.id;
            const projectData = req.body;

            const project = await this.updateProjectUseCase.execute(projectId, projectData);

            res.json(project);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete a project
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    async delete(req, res, next) {
        try {
            const projectId = req.params.id;

            await this.deleteProjectUseCase.execute(projectId);

            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProjectController;
