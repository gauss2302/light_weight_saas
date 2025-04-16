const IUserRepository = require("/backend/domain/interfaces/repositories/user-repository.interface")
const {User} = require("backend/models/user");
const UserEntity = require("/backend/domain/entities/user.entity");

class UserRepository extends IUserRepository {
    /**
     * Find user by ID
     * @param {string} id
     * @returns {Promise<UserEntity|null>}
     */
    async findById(id) {
        const user = await User.findByPk(id);
        if (!user) return null;

        return new UserEntity({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    }

    /**
     * Find user by email
     * @param {string} email
     * @returns {Promise<UserEntity|null>}
     */
    async findByEmail(email) {
        const user = await User.findOne({ where: { email } });
        if (!user) return null;

        return new UserEntity({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    }

    /**
     * Create new user
     * @param {UserEntity} userEntity
     * @returns {Promise<UserEntity>}
     */
    async create(userEntity) {
        const user = await User.create({
            username: userEntity.username,
            email: userEntity.email,
            password: userEntity.password,
        });

        return new UserEntity({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    }

    /**
     * Update user
     * @param {string} id
     * @param {Partial<UserEntity>} userData
     * @returns {Promise<UserEntity|null>}
     */
    async update(id, userData) {
        const user = await User.findByPk(id);
        if (!user) return null;

        await user.update(userData);

        return new UserEntity({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    }

    /**
     * Delete user
     * @param {string} id
     * @returns {Promise<boolean>}
     */
    async delete(id) {
        const user = await User.findByPk(id);
        if (!user) return false;

        await user.destroy();
        return true;
    }
}

module.exports = UserRepository;
