import mongoose from 'mongoose';
import { IUser, UserSettings } from '../types/User';
const { Schema, model } = mongoose;

const userSettingsSchema = new Schema<UserSettings>({
	theme: { type: String, default: 'light' },
	language: { type: String, default: 'en' },
});

const userSchema = new Schema<IUser>({
	email: { type: String, unique: true, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true },
	avatar: { type: String, default: '' },
	settings: { type: userSettingsSchema, default: { theme: 'dark', language: 'en' } },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String },
	status: { type: Boolean, required: false },
	chatRooms: { type: [Schema.Types.ObjectId], ref: 'ChatRoom' },
});

const UserModel = model('User', userSchema);

export { UserModel }