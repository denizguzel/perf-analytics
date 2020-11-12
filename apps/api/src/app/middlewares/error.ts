import httpStatus from 'http-status';
import { ApiError } from '../utils';
import { Request, Response } from 'express';

const handler = (err, req: Request, res: Response) => {
  const response = {
    code: err.status,
    errors: err.errors,
    message: err.message || httpStatus[err.status],
    stack: err.stack,
  };

  if (err.status) {
    res.status(err.status);
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
  res.json(response);
};

const converter = (err, req, res) => {
  let convertedError = err;

  if (!(err instanceof ApiError)) {
    convertedError = new ApiError({
      message: err.message,
      stack: err.stack,
      status: err.status,
    });
  }

  return handler(convertedError, req, res);
};

const notFound = (req, res) => {
  const err = new ApiError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });

  return handler(err, req, res);
};

export default {
  handler,
  converter,
  notFound,
};
