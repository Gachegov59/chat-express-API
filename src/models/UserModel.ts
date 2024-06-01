import mongoose from 'mongoose';
const { Schema, model } = mongoose;
//todo: joi or Zod 
const userSchema = new Schema({
	email: { type: String, unique: true, required: true },
	password:  { type: String, required: true },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String}
});

export const UserModel = model('User', userSchema);
