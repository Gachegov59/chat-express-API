import { MessageModel } from '../models/MessageModel';
import { Types } from 'mongoose';
import { ApiError } from '../exceptions/app-error';
import { RoomModel } from '../models/RoomModel';

class MessageService {
	async createMessage(content: string, roomId: string, userId: string) {
		const message = await MessageModel.create({
			content,
			room: new Types.ObjectId(roomId),
			sender: new Types.ObjectId(userId),
		});

		await RoomModel.findByIdAndUpdate(roomId, {
			$set: { 'lastMessage.text': content, 'lastMessage.date': new Date() },
			$inc: { [`counters.${userId}`]: 1 },
		});

		await RoomModel.updateMany(
			{ _id: roomId, users: { $ne: userId } },
			{ $inc: { [`counters.${userId}`]: 1 } }
		);

		return message;
	}

	async getMessagesForRoom(roomId: string) {
		const messages = await MessageModel.find({ room: roomId }).populate('sender', 'firstName lastName');
		return messages;
	}

	async resetUnreadCounter(roomId: string, userId: string) {
		await RoomModel.findByIdAndUpdate(roomId, {
			$set: { [`counters.${userId}`]: 0 },
		});
	}
}

export default new MessageService();
