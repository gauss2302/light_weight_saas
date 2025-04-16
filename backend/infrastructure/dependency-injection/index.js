/**
 * Basic Container Implementation
 * Place this at backend/infrastructure/dependency-injection/index.js
 */

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
     * Initialize the dependency injection container with minimum required dependencies
     */
    static init() {
        console.log('Container.init() started - basic implementation');

        // Register basic implementations for the server to start
        // You can expand this as needed
        this.register('UserRepository', {});
        this.register('TaskRepository', {});
        this.register('ProjectRepository', {});
        this.register('TokenRepository', {});
        this.register('JwtService', {
            verifyAccessToken: () => ({ userId: 'debug-user' })
        });

        this.register('AuthController', {});
        this.register('TaskController', {});
        this.register('ProjectController', {});

        console.log('Basic container initialized successfully');
    }
}

// Export the Container class itself
module.exports = Container;
