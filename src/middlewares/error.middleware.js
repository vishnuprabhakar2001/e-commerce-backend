const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode === 500 ? 500 : 400;

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Internal Server Error"
        : err.message,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};

export default errorHandler;

