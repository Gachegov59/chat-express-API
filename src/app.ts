import express, { NextFunction, Request, Response } from 'express';
import userRouter from './routes/usersRouter';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { endpoints } from './config/constants';
import errorMiddleware from './middlewares/error-middleware';
import roomRouter from './routes/roomRouter';

export function App() {
	const app = express();

	app.use(express.json());
	app.use(cookieParser());
	app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

	app.use(endpoints.USER.USERS_BASE_ROUTE, userRouter);
	app.use(endpoints.ROOM.ROOM_BASE_ROUTE, roomRouter);
	
	app.use(errorMiddleware);

	return app;
}
