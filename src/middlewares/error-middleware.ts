import { Request, Response } from 'express-serve-static-core';
import { ApiError } from '../exceptions/app-error';
import { NextFunction } from 'express';
import { errors } from '../config/constants';
import logger from '../utils/logger';

export default function (err: Error, req: Request, res: Response, next: NextFunction):  Response {
    // logger.error(`${err}`);
	logger.error(`Error in ${req.method} ${req.url}: ${err.message}`, err);
	console.log(err);
	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.message, errors: err.errors });
	}
    return res.status(500).json({ message: errors.UNEXPECTED_SERVER_ERROR });
}
