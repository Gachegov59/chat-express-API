import { NextFunction, Request, Response } from 'express-serve-static-core';
import { ApiError } from '../exceptions/app-error';
import tokenService from '../service/token-service';

type AuthMiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;

const authMiddleware: AuthMiddlewareFunction = (req, res, next) => {
	try {
		const authorization = req.headers.authorization;
		if (!authorization) return next(ApiError.UnautorizedError());

		const accessToken = authorization.split(' ')[1];
		if (!accessToken) return next(ApiError.UnautorizedError());

		const userData = tokenService.validateAccessToken(accessToken);
		if (!userData) return next(ApiError.UnautorizedError());

		req.user = userData;
		next();
	} catch (error) {
		return next(ApiError.UnautorizedError());
	}
};

export default authMiddleware;
export type { authMiddleware };
