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

    static notFound(message = "not found") {
        return new ApiError(404, message);
    }

    static unAuthorized(message = "unAuthorized") {
        return new ApiError(401, message)
    }
}

export default ApiError;