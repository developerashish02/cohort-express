class ApiError extends Error {

    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }

    static badRequest(message = "bad request") {
        return new ApiError(400, message);
    }

    static conflict(message = "conflict") {
        return new ApiError(409, message);
    }
}

export default ApiError;