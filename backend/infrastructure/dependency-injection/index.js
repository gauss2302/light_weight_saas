class Container {
    static _instances = {};

    /**
     * Register a dependency in the container.
     * @param {string} name - The unique identifier for the dependency.
     * @param {*} instance - The instance to register.
     */
    static register(name, instance) {
        Container._instances[name] = instance;
    }

    /**
     * Retrieve a registered dependency from the container.
     * @param {string} name - The unique identifier for the dependency.
     * @returns {*} The registered instance.
     * @throws {Error} If the dependency is not found.
     */
    static get(name) {
        if (!Container._instances[name]) {
            throw new Error(`Cannot find a container with id ${name}`);
        }
        return Container._instances[name];
    }

    /**
     * Validate that all required dependencies are registered.
     */
    static validateDependencies() {
        const requiredDependencies = [
            'UserRepository',
            'TaskRepository',
            'ProjectRepository',
            'TokenRepository',
            'JwtService',
            'RegisterUserUseCase',
            'LoginUserUseCase',
            'RefreshTokenUseCase',
            'LogoutUseCase',
            'CreateTaskUseCase',
            'GetUserTasksUseCase',
            'GetTaskUseCase',
            'UpdateTaskUseCase',
            'DeleteTaskUseCase',
        ];

        requiredDependencies.forEach((name) => {
            if (!Container._instances[name]) {
                throw new Error(`Missing required dependency: ${name}`);
            }
        });
    }

    /**
     * Initialize the dependency injection container.
     */
    static init() {
        this.initRepositories();
        this.initServices();
        this.initAuthUseCases();
        this.initTaskUseCases();
        this.validateDependencies();
    }

    /**
     * Initialize repository dependencies.
     */
    static initRepositories() {
        const UserRepository = require('../database/repositories/user.repository');
        const TaskRepository = require('../database/repositories/task.repository');
        const ProjectRepository = require('../database/repositories/project.repository');
        const TokenRepository = require('../database/repositories/token.repository');

        Container.register('UserRepository', new UserRepository());
        Container.register('TaskRepository', new TaskRepository());
        Container.register('ProjectRepository', new ProjectRepository());
        Container.register('TokenRepository', new TokenRepository());
    }

    /**
     * Initialize service dependencies.
     */
    static initServices() {
        const JwtService = require('../security/jwt.service');
        Container.register('JwtService', new JwtService());
    }

    /**
     * Initialize authentication-related use cases.
     */
    static initAuthUseCases() {
        const RegisterUserUseCase = require('../../application/use-cases/auth/register-user.use-case');
        const LoginUserUseCase = require('../../application/use-cases/auth/login-user.use-case');
        const RefreshTokenUseCase = require('../../application/use-cases/auth/refresh-token.use-case');
        const LogoutUseCase = require('../../application/use-cases/auth/logout.use-case');

        Container.register(
          'RegisterUserUseCase',
          new RegisterUserUseCase(Container.get('UserRepository'))
        );

        Container.register(
          'LoginUserUseCase',
          new LoginUserUseCase(
            Container.get('UserRepository'),
            Container.get('TokenRepository'),
            Container.get('JwtService')
          )
        );

        Container.register(
          'RefreshTokenUseCase',
          new RefreshTokenUseCase(
            Container.get('TokenRepository'),
            Container.get('UserRepository'),
            Container.get('JwtService')
          )
        );

        Container.register(
          'LogoutUseCase',
          new LogoutUseCase(Container.get('TokenRepository'))
        );
    }

    /**
     * Initialize task-related use cases.
     */
    static initTaskUseCases() {
        const CreateTaskUseCase = require('../../application/use-cases/task/create-task.use-case');
        const GetUserTasksUseCase = require('../../application/use-cases/task/get-user-tasks.use-case');
        const GetTaskUseCase = require('../../application/use-cases/task/get-task.use-case');
        const UpdateTaskUseCase = require('../../application/use-cases/task/update-task.use-case');
        const DeleteTaskUseCase = require('../../application/use-cases/task/delete-task.use-case');

        Container.register(
          'CreateTaskUseCase',
          new CreateTaskUseCase(Container.get('TaskRepository'))
        );

        Container.register(
          'GetUserTasksUseCase',
          new GetUserTasksUseCase(Container.get('TaskRepository'))
        );

        Container.register(
          'GetTaskUseCase',
          new GetTaskUseCase(Container.get('TaskRepository'))
        );

        Container.register(
          'UpdateTaskUseCase',
          new UpdateTaskUseCase(Container.get('TaskRepository'))
        );

        Container.register(
          'DeleteTaskUseCase',
          new DeleteTaskUseCase(Container.get('TaskRepository'))
        );
    }
}

module.exports = Container;
