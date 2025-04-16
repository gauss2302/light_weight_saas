class LogoutUseCase {
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    /**
     * Logout user by invalidating refresh token
     * @param {string} refreshToken
     * @returns {Promise<boolean>}
     */

    async execute(refreshToken) {
        const tokenEntity = await this.tokenRepository.findByToken(refreshToken, "refresh");

        if (!tokenEntity) {
            return true;
        }

        await this.tokenRepository.delete(tokenEntity.id);
        return true;
    }
}

module.exports = LogoutUseCase;
