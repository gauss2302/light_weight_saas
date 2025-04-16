const { Container } = require('/backend/infrastructure/dependency-injection/index');

/**
 * Authentication middleware
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 */
const authMiddleware = (req, res, next) => {
  try {
    const jwtService = Container.get('JwtService');
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwtService.verifyAccessToken(token);

    // Attach user information to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid or expired' });
  }
};

module.exports = authMiddleware;
