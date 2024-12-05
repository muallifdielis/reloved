// utils/ResponseAPI.js
class ResponseAPI {
    static success(res, data, message = 'Success', statusCode = 200) {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    static error(res, message, statusCode = 400) {
        res.status(statusCode).json({
            success: false,
            message,
        });
    }

    static serverError(res, error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
}

module.exports = ResponseAPI;
