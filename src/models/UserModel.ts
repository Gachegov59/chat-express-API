import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema, model } = mongoose;

interface UserSettings {
	theme: 'light' | 'dark';
	language: 'en' | 'ru' | 'iw';
}
interface IUser extends Document {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	avatar: string;
	settings: UserSettings;
	isActivated: boolean;
	activationLink?: string;
}

const userSettingsShema = new Schema<UserSettings>({
	theme: { type: String, default: 'light' },
	language: { type: String, default: 'en' },
});

const userSchema = new Schema<IUser>({
	email: { type: String, unique: true, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true },
	avatar: { type: String, default: '' },
	settings: { type: userSettingsShema, default: { theme: 'dark', language: 'en' } },
	isActivated: { type: Boolean, default: false },
	// activationLink: { type: String },
});

const UserModel = model('User', userSchema);

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

const validateUserLogin= (userData: Partial<IUser>) => {
	return userLoginJoiSchema.validate(userData);
};

export { UserModel, validateUserReg, validateUserLogin };
