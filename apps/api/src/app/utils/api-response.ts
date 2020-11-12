import httpStatus from 'http-status';

type ErrorInterface = Partial<{
  message: string;
  stack: string;
  status: number;
  errors: unknown;
}>;

class ExtendableError extends Error {
  errors: unknown;
  status: unknown;

  constructor({ message, errors, status, stack }: ErrorInterface) {
    super(message);
    this.name = this.constructor.name;
    this.stack = stack;
    this.message = message;
    this.errors = errors;
    this.status = status;
  }
}

export class ApiError extends ExtendableError {
  constructor({ message, errors, stack, status = httpStatus.INTERNAL_SERVER_ERROR }: ErrorInterface) {
    super({
      errors,
      message,
      stack,
      status,
    });
  }
}
