class UserEntity {
    constructor({id, email, username, password, createdAt, updatedAt}) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            username: this.username,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}

module.exports = UserEntity;
