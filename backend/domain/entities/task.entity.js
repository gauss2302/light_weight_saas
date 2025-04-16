class TaskEntity {
    constructor({id, title, description, status, priority, dueDate, userId, createdAt, updatedAt}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    isCompleted() {
        return this.status === "DONE";
    }

    isPassedDues() {
        if(!this.dueDate) return false;
        return this.dueDate >= new Date(this.dueDate);
    }

    canBeAccessedBy(userId) {
        return this.userId === userId;
    }
}

module.exports = TaskEntity;
