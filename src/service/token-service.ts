import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { tokenModel } from '../models/TokenModel';
dotenv.config();
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
	throw new Error('JWT secrets are not defined in environment variables');
}

type GenerateTokensPayload = { email: string; id: string; isActivated: boolean, firstName: string, lastName: string };
type generateTokensReturn = {
	accessToken: string;
	refreshToken: string;
};

class TokenService {
	generateTokens(payload: GenerateTokensPayload): generateTokensReturn {
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

	validateAccessToken(token: string): JwtPayload | null {
		try {
			const userData = jwt.verify(token, JWT_ACCESS_SECRET!) as JwtPayload;
			return userData;
		} catch (error) {
			console.error('Invalid access token', error);
			return null;
		}
	}

	validateRefreshToken(token: string) {
		try {
			const userData = jwt.verify(token, JWT_REFRESH_SECRET!) as jwt.JwtPayload;
			return userData;
		} catch (error) {
			console.error('Invalid refresh token', error);
			return null;
		}
	}
}

export default new TokenService();
