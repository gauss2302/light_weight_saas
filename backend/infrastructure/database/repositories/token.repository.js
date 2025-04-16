const ITokenRepository = require('../../../domain/interfaces/repositories/token-repository.interface');
const { Token } = require('../../../models/token');

class TokenRepository extends ITokenRepository {
    /**
     * Find token by token string
     * @param {string} token
     * @param {string} type
     * @returns {Promise<Object|null>}
     */
    async findByToken(token, type) {
        const tokenRecord = await Token.findOne({
            where: { token, type }
        });

        if (!tokenRecord) return null;

        return {
            id: tokenRecord.id,
            token: tokenRecord.token,
            type: tokenRecord.type,
            userId: tokenRecord.userId,
            createdAt: tokenRecord.createdAt,
            updatedAt: tokenRecord.updatedAt,
        };
    }

    /**
     * Find tokens by user ID
     * @param {string} userId
     * @param {string} type
     * @returns {Promise<Object[]>}
     */
    async findByUserId(userId, type) {
        const tokens = await Token.findAll({
            where: { userId, type }
        });

        return tokens.map(token => ({
            id: token.id,
            token: token.token,
            type: token.type,
            userId: token.userId,
            createdAt: token.createdAt,
            updatedAt: token.updatedAt,
        }));
    }

    /**
     * Create new token
     * @param {Object} tokenData
     * @returns {Promise<Object>}
     */
    async create(tokenData) {
        const token = await Token.create(tokenData);

        return {
            id: token.id,
            token: token.token,
            type: token.type,
            userId: token.userId,
            createdAt: token.createdAt,
            updatedAt: token.updatedAt,
        };
    }

    /**
     * Delete token
     * @param {string} id
     * @returns {Promise<boolean>}
     */
    async delete(id) {
        const token = await Token.findByPk(id);
        if (!token) return false;

        await token.destroy();
        return true;
    }

    /**
     * Delete tokens by user ID
     * @param {string} userId
     * @param {string} type
     * @returns {Promise<boolean>}
     */
    async deleteByUserId(userId, type) {
        await Token.destroy({
            where: { userId, type }
        });

        return true;
    }
}

module.exports = TokenRepository;
