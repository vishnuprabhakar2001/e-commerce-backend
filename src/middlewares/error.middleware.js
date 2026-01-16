const errorHandler = (err, req, res, next) => {
  const message = err.message || "Something went wrong";

  res.status(400).json({
    success: false,
    message
  });
};

export default errorHandler;
