const bcrypt = require("bcryptjs");

class LoginUserUseCase {
    constructor(userRepository, tokenRepository, jwtService) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.jwtService = jwtService;
    }

    /**
     * Login user and generates tokens
     * @param {import("backend/application/dtos/auth.dto").LoginDto} credentials
     * @returns {Promise<import("backend/application/dtos/auth.dto").AuthResponseDto>}
     */

    async execute(credentials) {
        const userEntity = await this.userRepository.findByEmail(credentials.email);

        if (!userEntity) {
            const error = new Error("Email already exists");
            error.status = 401;
            throw error;
        }

        //passowrd validation
        const isValidPassword = await bcrypt.compare(credentials.password, userEntity.password);

        if (!isValidPassword) {
            const error = new Error("Passwords do not match");
            error.status = 401;
            throw error;
        }

        // generate tokens
        const accessToken = this.jwtService.generateAccessToken({
            userId: userEntity.id,
            email: userEntity.email,
        });

        //create refresh token
        const refreshToken = this.jwtService.generateRefreshToken({
            userId: userEntity.id,
        });

        // create token entiry and save
        const tokenEntity = {
            token: refreshToken,
            type: "refresh",
            userId: userEntity.id,
        };

        await this.tokenRepository.deleteByUserId(userEntity.id, 'refresh');
        await this.tokenRepository.create(tokenEntity);
    }
}

module.exports = LoginUserUseCase;
