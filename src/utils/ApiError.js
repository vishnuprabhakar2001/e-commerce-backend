class ApiError extends Error {
  constructor(
    message = "Bad Request",
    statusCode = 400,
    errors = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
