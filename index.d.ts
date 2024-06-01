import * as express from 'express-serve-static-core';

declare global {
	namespace Express {
		interface Request {
			customField?: string;
		}
	}
	// namespace Express {
	// 	export interface Request {
	// 		user?: {
	// 			id: string;
	// 			username: string;
	// 			role?: string;
	// 		};
	// 	}
	// }
}
