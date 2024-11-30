export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 'AUTH_ERROR', details);
    this.name = 'AuthenticationError';
  }
}

export class ApiError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 'API_ERROR', details);
    this.name = 'ApiError';
  }
}