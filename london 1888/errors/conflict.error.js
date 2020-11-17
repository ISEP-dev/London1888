class ConflictError extends Error {
    constructor(message) {
        super(`Conflict error : ${message}`);
        this.status = 409;
    }
}

export default ConflictError;

