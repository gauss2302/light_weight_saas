class ITokenRepository {
    findByToken(token, type){
        throw new Error("Not implemented");
    }

    findByUserId(userId, type) {
        throw new Error('Method not implemented');
    }

    create(tokenData) {
        throw new Error('Method not implemented');
    }

    delete(id) {
        throw new Error('Method not implemented');
    }

    deleteByUserId(userId, type) {
        throw new Error('Method not implemented');
    }

}

module.exports = ITokenRepository;
