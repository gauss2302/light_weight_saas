require(`dotenv`).config();

module.exports = {
    server: {
        port: process.env.PORT || 5489,
        environment: process.env.NODE_ENV || 'development',
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
        refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
    },
    cors: {
        allowedOrigins: process.env.ALLOWED_ORIGINS ?
            process.env.ALLOWED_ORIGINS.split(',') :
            ['http://localhost:3000'],
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
    },
}
