import { Request, Response } from 'express-serve-static-core';
import { NextFunction } from 'express';

export type ControllerFunction<ReqParamsDictionary = {}, ResBody = {}, ReqBody = {},  ReqQuery = {}, R = void> = (
	req: Request<ReqParamsDictionary, ResBody, ReqBody, ReqQuery>,
	res: Response<ResBody>,
	next: NextFunction
) => R;


