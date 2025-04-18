export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public details?: any;

  constructor(message: string, statusCode: number, isOperational=true, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this);
  }
} 


//Not Found Error
export class NotFoundError extends AppError {
  constructor(message: string="Resource is not found") {
    super(message, 404);
  }
}

// validation error
export class ValidationError extends AppError {
  constructor(message: string="Validation Error", details?: any) {
    super(message, 400, true, details);
  }
}

// authentication error 
export class AuthenticationError extends AppError {
  constructor(message: string="Authentication Error") {
    super(message, 401);
  }
}

//Forbidden error
export class ForbiddenError extends AppError {
  constructor(message: string="Forbidden access") {
    super(message, 403);
  }
}

//Database error
export class DatabaseError extends AppError {
  constructor(message: string="Database Error", details?: any) {
    super(message, 500, true, details);
  }
}


//Rate limit error
export class RateLimitError extends AppError {
  constructor(message: string="Rate limit exceeded") {
    super(message, 429);
  }
}



