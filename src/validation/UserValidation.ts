import Joi from 'joi';
import { IUser, UserSettings } from '../types/User';

// Joi schemas
const userSettingsJoiSchema = Joi.object<UserSettings>({
	theme: Joi.string().valid('light', 'dark').default('light'),
	language: Joi.string().valid('en', 'ru', 'iw').default('en'),
});
const userRegJoiSchema = Joi.object<IUser>({
	email: Joi.string().email().required(),
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	password: Joi.string().required(),
	avatar: Joi.string().default(''),
	settings: userSettingsJoiSchema.default({ theme: 'dark', language: 'en' }),
	isActivated: Joi.boolean().default(false),
	activationLink: Joi.string().optional(),
});

const userLoginJoiSchema = Joi.object<IUser>({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

const validateUserReg = (userData: Partial<IUser>) => {
	return userRegJoiSchema.validate(userData);
};

const validateUserLogin = (userData: Partial<IUser>) => {
	return userLoginJoiSchema.validate(userData);
};

export { validateUserReg, validateUserLogin };
