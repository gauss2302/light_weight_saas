// src/application/use-cases/auth/refresh-token.use-case.js
class RefreshTokenUseCase {
    constructor(tokenRepository, userRepository, jwtService) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    /**
     * Refresh access token using refresh token
     * @param {string} refreshToken
     * @returns {Promise<{token: string}>}
     */
    async execute(refreshToken) {
        try {
            // Verify refresh token - this will throw an error if invalid
            const payload = this.jwtService.verifyRefreshToken(refreshToken);

            // Check if token exists in database
            const tokenEntity = await this.tokenRepository.findByToken(refreshToken, 'refresh');
            if (!tokenEntity) {
                const error = new Error('Invalid refresh token');
                error.statusCode = 401;
                throw error;
            }

            // Get user entity
            const userEntity = await this.userRepository.findById(payload.userId);
            if (!userEntity) {
                const error = new Error('User not found');
                error.statusCode = 404;
                throw error;
            }

            // Generate new access token
            const accessToken = this.jwtService.generateAccessToken({
                userId: userEntity.id,
                email: userEntity.email
            });

            return { token: accessToken };
        } catch (error) {
            // Catch any JWT verification errors
            if (!error.statusCode) {
                error.message = 'Invalid refresh token';
                error.statusCode = 401;
            }
            throw error;
        }
    }
}

module.exports = RefreshTokenUseCase;
