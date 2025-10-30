//custom error class

export class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "APIError"; // set the error type to api error
  }
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack); //log the error stack

  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: "validation error",
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};
