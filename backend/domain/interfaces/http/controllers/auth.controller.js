class AuthController {
    constructor(
        registerUserUseCase,
        loginUserUseCase,
        refreshTokenUseCase,
        logoutUseCase
    ) {
        this.registerUserUseCase = registerUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
        this.logoutUseCase = logoutUseCase;
    }

    /**
     * Register a new user
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    async register(req, res, next) {
        try {
            const userData = req.body;
            const user = await this.registerUserUseCase.execute(userData);

            res.status(201).json({
                message: 'User registered successfully',
                user: user.toJSON(),
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Login user
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    async login(req, res, next) {
        try {
            const credentials = req.body;
            const result = await this.loginUserUseCase.execute(credentials);

            // Set HTTP-only cookie with refresh token for enhanced security
            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.json({
                message: 'Login successful',
                token: result.token,
                user: result.user,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Refresh access token
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    async refreshToken(req, res, next) {
        try {
            // Get refresh token from cookie for better security
            const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

            if (!refreshToken) {
                return res.status(401).json({ message: 'Refresh token is required' });
            }

            const result = await this.refreshTokenUseCase.execute(refreshToken);

            res.json({
                token: result.token,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Logout user
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    async logout(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

            if (refreshToken) {
                await this.logoutUseCase.execute(refreshToken);
            }

            // Clear the refresh token cookie
            res.clearCookie('refreshToken');

            res.json({ message: 'Logout successful' });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Verify user's auth status
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    async verify(req, res, next) {
        try {
            // This route assumes auth middleware has already verified the token
            // and attached the user to the request
            res.json({ user: req.user });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;
