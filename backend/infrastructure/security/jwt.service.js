const jwt = require('jsonwebtoken');
const config = require('/backend/config/app');


class JwtService {
    /**
     * Generate access token
     * @param {Object} payload
     * @returns {string}
     */
    generateAccessToken(payload) {
        return jwt.sign(payload, config.auth.jwtSecret, {
            expiresIn: config.auth.jwtExpiresIn
        });
    }

    /**
     * Generate refresh token
     * @param {Object} payload
     * @returns {string}
     */
    generateRefreshToken(payload) {
        return jwt.sign(payload, config.auth.jwtSecret, {
            expiresIn: config.auth.refreshTokenExpiresIn
        });
    }

    /**
     * Verify access token
     * @param {string} token
     * @returns {Object}
     * @throws {Error} If token is invalid or expired
     */
    verifyAccessToken(token) {
        try {
            return jwt.verify(token, config.auth.jwtSecret);
        } catch (error) {
            const customError = new Error('Invalid access token');
            customError.statusCode = 401;
            throw customError;
        }
    }

    /**
     * Verify refresh token
     * @param {string} token
     * @returns {Object}
     * @throws {Error} If token is invalid or expired
     */
    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, config.auth.jwtSecret);
        } catch (error) {
            const customError = new Error('Invalid refresh token');
            customError.statusCode = 401;
            throw customError;
        }
    }
}

module.exports = JwtService;
