const path = require('path');
const bcrypt = require("bcryptjs");

// Get the base path
const basePath = path.resolve(__dirname, '../../../..');
const UserEntity = require(path.join(basePath, 'backend', 'domain', 'entities', 'user.entity'));

class RegisterUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @returns {Promise<UserEntity>}
     */
    async execute(userData) {
        const existingUser = await this.userRepository.findByEmail(userData.email);

        if (existingUser) {
            const error = new Error('User with this email already exists');
            error.statusCode = 400;
            throw error;
        }

        const user = new UserEntity({
            username: userData.username,
            email: userData.email,
            password: userData.password // Will be hashed by repository or model hook
        });

        return this.userRepository.create(user);
    }
}

module.exports = RegisterUserUseCase;
