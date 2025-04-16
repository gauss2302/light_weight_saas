/**
 * @interface IUserRepository
 */
class IUserRepository{
    /**
     * @param {string} id
     * @returns {Promise<UserEntity|null>}
     */
    findById(id) {
        throw new Error('Method not implemented');
    }

    /**
     * @param {string} email
     * @returns {Promise<UserEntity|null>}
     */
    findByEmail(email) {
        throw new Error('Method not implemented');
    }

    /**
     * @param {Object} userData
     * @returns {Promise<UserEntity>}
     */
    create(userData) {
        throw new Error('Method not implemented');
    }

    /**
     * @param {string} id
     * @param {Object} userData
     * @returns {Promise<UserEntity|null>}
     */
    update(id, userData) {
        throw new Error('Method not implemented');
    }
}

module.exports = IUserRepository;
