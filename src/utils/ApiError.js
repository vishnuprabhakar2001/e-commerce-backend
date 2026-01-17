class ApiError extends Error {
  constructor(
    statusCode = 400,
    message = "Bad Request",
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
 