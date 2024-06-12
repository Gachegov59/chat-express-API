import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { tokenModel } from '../models/TokenModel';
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

type generateTokens = { email: string; id: string; isActivated: boolean };
type generateTokensReturn = {
	accessToken: string;
	refreshToken: string;
};

class TokenService {
	generateTokens(payload: generateTokens): generateTokensReturn {
		const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET!, { expiresIn: '60m' });
		const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET!, { expiresIn: '30d' });
		return { accessToken, refreshToken };
	}
	async saveToken(userId: string, refreshToken: string) {
		const tokenData = await tokenModel.findOne({ user: userId });

		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}

		return await tokenModel.create({ user: userId, refreshToken });
	}
	
	async removeToken(refreshToken: string) {
		return await tokenModel.deleteOne({ refreshToken });
	}

	async findToken(refreshToken: string) {
		return await tokenModel.findOne({ refreshToken });
	}

	validateAccessToken(token: string) {
		try {
			const userData = jwt.verify(token, JWT_ACCESS_SECRET!);
			return userData;
		} catch (error) {
			return null;
		}
	}

	validateRefreshToken(token: string) {
		try {
			const userData = jwt.verify(token, JWT_REFRESH_SECRET!);
			return userData;
		} catch (error) {
			return null;
		}
	}
}

export default new TokenService();
