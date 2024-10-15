class ApiError{
    constructor(
        statusCode,
        message= "Something went wrong",
    ) {
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
    }
}

function sendError(res, statusCode, message, data={}) {
    res.status(statusCode).json({
        success: false,
        message: message,
        data: data,
    })
}


export { ApiError, sendError }