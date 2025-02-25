export function errorMiddleware(err, req, res) {
    console.error("Global Error:", err);

    if (err.name === "ValidationError") {
        return res.badInput("Validation error", err.errors);
    }

    if (err.name === "CastError") {
        return res.badInput("Invalid ID format", err.message);
    }

    res.internalError("An unexpected error occurred");
}