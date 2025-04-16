class ProjectEntity {
    constructor({ id, name, description, status, userId, createdAt, updatedAt }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status || 'ACTIVE';
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    isActive() {
        return this.status === 'ACTIVE';
    }

    canBeAccessedBy(userId) {
        return this.userId === userId;
    }
}

module.exports = ProjectEntity;
