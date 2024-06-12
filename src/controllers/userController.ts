import userService from '../service/user-service';
import { ApiError } from '../exceptions/app-error';
import { registration } from '../utils/validations/userRequests';

import { Request, Response } from 'express-serve-static-core';
import { NextFunction } from 'express';
import { registrationUser, logoutUser, activateUser, loginUser, refreshTokenUser, getUsers } from './types/User';

class userController {
	registerationUser: registrationUser = async (req, res, next) => {
		try {
			const validObj = await registration.validate(req.body);

			if (validObj.error) {
				console.log('🚀 ~ userController ~ error:', validObj.error.details);
				throw ApiError.BadRequest(validObj.error.toString(), validObj.error.details);
			}

			const { email, password, firstName, lastName } = req.body;
			const userData = await userService.registration(email, password, firstName, lastName);

			res.cookie('refreshToken', userData?.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.json(userData);
		} catch (error) {
			next(error);
		}
	};

	loginUser: loginUser = async (req, res, next) => {
		try {
			const { email, password } = req.body;
			const userData = await userService.login(email, password);

			res.cookie('refreshToken', userData?.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.json(userData);
		} catch (error) {
			next(error);
		}
	};

	logoutUser: logoutUser = async (req, res, next) => {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (error) {
			next(error);
		}
	};

	activateUser: activateUser = async (req, res, next) => {
		try {
			const activationLink = req.params.link;
			await userService.acivate(activationLink);
			return res.redirect(process.env.CLIENT_URL!);
		} catch (error) {
			next(error);
		}
	};

	refreshTokenUser: refreshTokenUser = async (req, res, next) => {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);
			res.cookie('refreshToken', userData?.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	 getUsers: getUsers = async (req, res, next) => {
		try {
			const users = await userService.getAllUsers();
			return res.json(users)
		} catch (error) {
			next(error);
		}
	}
}

export default new userController();
