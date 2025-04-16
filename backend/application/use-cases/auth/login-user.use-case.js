const bcrypt = require("bcryptjs");
const path = require('path');

class LoginUserUseCase {
    constructor(userRepository, tokenRepository, jwtService) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.jwtService = jwtService;
    }

    /**
     * Login user and generates tokens
     * @param {Object} credentials - Login credentials
     * @returns {Promise<Object>} - Authentication response with token and user
     */
    async execute(credentials) {
        const userEntity = await this.userRepository.findByEmail(credentials.email);

        if (!userEntity) {
            const error = new Error("Invalid credentials");
            error.status = 401;
            throw error;
        }

        // Password validation
        const isValidPassword = await bcrypt.compare(credentials.password, userEntity.password);

        if (!isValidPassword) {
            const error = new Error("Invalid credentials");
            error.status = 401;
            throw error;
        }

        // Generate tokens
        const accessToken = this.jwtService.generateAccessToken({
            userId: userEntity.id,
            email: userEntity.email,
        });

        // Create refresh token
        const refreshToken = this.jwtService.generateRefreshToken({
            userId: userEntity.id,
        });

        // Create token entity and save
        const tokenEntity = {
            token: refreshToken,
            type: "refresh",
            userId: userEntity.id,
        };

        await this.tokenRepository.deleteByUserId(userEntity.id, 'refresh');
        await this.tokenRepository.create(tokenEntity);

        // Return authentication response
        return {
            token: accessToken,
            refreshToken: refreshToken,
            user: userEntity.toJSON()
        };
    }
}

module.exports = LoginUserUseCase;
