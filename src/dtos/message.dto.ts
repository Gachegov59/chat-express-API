import { IMessage } from '../models/MessageModel';

export default class MessageDTO {
	id: string;
	content: string;
	roomId: string;
	senderId: string;
	createdAt: Date;

	constructor(message: IMessage) {
		this.id = message._id.toString();
		this.content = message.content;
		this.roomId = message.room.toString();
		this.senderId = message.sender.toString();
		this.createdAt = message.createdAt;
	}
}
