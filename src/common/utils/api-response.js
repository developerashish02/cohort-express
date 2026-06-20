class ApiResponse {
    static ok(res, message, data = null) {
        return res.status(200).json({
            success: true,
            message,
            data,
        })
    }

    static create(res, message, data = null) {
        return res.status(201).json({
            success: true,
            message,
            data,
        })
    }

    static error(res, err) {
        const statusCode = err.statusCode ?? 500;
        const errMessage = err.message ?? "Internal Server Error.";

        return res.status(statusCode).json({
            success: false,
            message: errMessage,
            data: null
        })
    }
}

export default ApiResponse;