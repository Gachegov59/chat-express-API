import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const TokenSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	refreshToken: { type: String, required: true },
});

export const tokenModel = model('Token', TokenSchema);
