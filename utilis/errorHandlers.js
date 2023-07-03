// Custom Error Handler Middleware
const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    // Default error status and message
    let statusCode = 500;
    let message = 'Internal Server Error';
  
    // Check for specific error types
    if (err instanceof MyCustomError) {
      // Custom error handling logic
      statusCode = err.statusCode;
      message = err.message;
    } else if (err.name === 'ValidationError') {
      // Mongoose validation error handling
      statusCode = 400;
      message = err.message;
    }
  
    // Send error response
    res.status(statusCode).json({ error: message });
  };
  
  module.exports = errorHandler;
  