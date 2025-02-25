export const ResponseCodes = {
    Success: 'SUCCESS',
    BadInput: 'BAD_INPUT',
    Forbidden: 'FORBIDDEN',
    InternalServerError: 'INTERNAL_SERVER_ERROR',
    NotFound: 'NOT_FOUND',
    InvalidCredentials: 'INVALID_CREDENTIALS',
    NoFileUploaded: 'NO_FILE_UPLOADED',
    FileNotFound: 'FILE_NOT_FOUND',
    Unauthorized: 'UNAUTHORIZED',
};

export function responseMiddleware(req, res, next) {
    res.success = function (data = null) {
        res.status(200).json({ status: ResponseCodes.Success, data });
    };

    res.badInput = function (message = "Bad input", data = null) {
        res.status(400).json({ status: ResponseCodes.BadInput, message, data });
    };

    res.unauthorized = function (message = "Unauthorized", data = null) {
        res.status(401).json({ status: ResponseCodes.Unauthorized, message, data });
    };

    res.forbidden = function (message = "Forbidden", data = null) {
        res.status(403).json({ status: ResponseCodes.Forbidden, message, data });
    };

    res.notFound = function (message = "Not found", data = null) {
        res.status(404).json({ status: ResponseCodes.NotFound, message, data });
    };

    res.internalError = function (message = "Internal server error", data = null) {
        res.status(500).json({ status: ResponseCodes.InternalServerError, message, data });
    };

    next();
}