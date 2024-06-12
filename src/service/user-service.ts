import dotenv from 'dotenv';
import { UserModel } from '../models/UserModel';
import { errors, services } from '../config/constants';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import mailService from './mail-service';
import tokenService from './token-service';
import UserDTO from '../dtos/user.dto';
import { ApiError } from '../exceptions/app-error';
import { IUser } from '../types/User';
import { validateUserLogin, validateUserReg } from '../validation/UserValidation';
dotenv.config();
type logoutReturn = Promise<{ acknowledged: boolean; deletedCount: number }>;

class UserService {
	async registration(email: string, password: string, firstName: string, lastName: string) {
		const { error } = validateUserReg({ email, password, firstName, lastName });
		if (error) throw ApiError.BadRequest(error.details[0].message);

		const candidate = await UserModel.findOne({ email });
		if (candidate) throw ApiError.BadRequest(errors.USER_WITH_THIS_EMAIL_ALREADY_EXIST);

		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink: string = uuid.v4();
		const user = await UserModel.create({
			email,
			password: hashPassword,
			activationLink,
			firstName,
			lastName,
		});

		await mailService.sendActivationMail(email, `${services.MAIL.LINK_ACTIVATE}/${activationLink}`);

		const userDTO = new UserDTO({ email: user.email, _id: user._id, isActivated: user.isActivated });
		const tokens = await tokenService.generateTokens({ ...userDTO });

		await tokenService.saveToken(userDTO.id, tokens.refreshToken);

		return { ...tokens, user: userDTO };
	}

	async acivate(activationLink: string) {
		const user = await UserModel.findOne({ activationLink });
		if (!user) throw ApiError.BadRequest(errors.INVALID_LINK_ACTIVATION);
		user.isActivated = true;
		await user.save();
	}

	async login(email: string, password: string) {
		const { error } = validateUserLogin({ email, password });
		if (error) throw ApiError.BadRequest(error.details[0].message);

		const user = await UserModel.findOne({ email });
		if (!user) throw ApiError.BadRequest(errors.USER_NOT_FOUND);

		const isPassEquals = await bcrypt.compare(password, user.password);

		if (!isPassEquals) throw ApiError.BadRequest(errors.WRONG_PASSORD);

		const userDTO = new UserDTO({ email: user.email, _id: user._id, isActivated: user.isActivated });
		const tokens = tokenService.generateTokens({ ...userDTO });
		await tokenService.saveToken(userDTO.id, tokens.refreshToken);
		return { ...tokens, user: userDTO };
	}

	async logout(refreshToken: string): logoutReturn {
		return await tokenService.removeToken(refreshToken);
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) {
			console.error('Refresh token is missing');
			throw ApiError.UnauthorizedError;
		}

		const userData = tokenService.validateRefreshToken(refreshToken) as unknown as { id: string };
		const tokenFromDb = await tokenService.findToken(refreshToken);
		if (!userData) {
			console.error('Invalid refresh token');
			throw ApiError.UnauthorizedError();
		}
		if (!tokenFromDb) {
			console.error('Refresh token not found in database');
			throw ApiError.UnauthorizedError();
		}

		const user = await UserModel.findById(userData.id);
		if (!user) {
			console.error('User not found');
			throw ApiError.BadRequest(errors.USER_NOT_FOUND);
		}

		const userDTO = new UserDTO({ email: user.email, _id: user._id, isActivated: user.isActivated });
		const tokens = tokenService.generateTokens({ ...userDTO });
		await tokenService.saveToken(userDTO.id, tokens.refreshToken);

		return { ...tokens, user: userDTO };
	}

	async getAllUsers() {
		const users = await UserModel.find();
		return users;
	}
}

export default new UserService();
