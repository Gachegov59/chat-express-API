import * as express from 'express-serve-static-core';
import { IUser } from './src/types/User';

declare global {
	namespace Express {
		interface Request {
			// user?: Partial<IUser>;
			customField?: string;
		}
	}
}
