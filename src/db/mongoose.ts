import 'dotenv/config';
import mongoose, { ConnectOptions } from 'mongoose';
import logger from '../utils/logger';
const MONGO_URI: string = process.env.MONGO_URI || '';
// const MONGO_AUTH_URI: string = process.env.MONGO_AUTH_URI || '';

export const connectChatDb = async () => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions);

		logger.info('MongoDB connected chat');
	} catch (error) {
		console.log(error);
		logger.error(error);
	}
};
