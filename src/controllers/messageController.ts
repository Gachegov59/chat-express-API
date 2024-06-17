import { Request, Response, NextFunction } from 'express';
import MessageDTO from '../dtos/message.dto';
import { createMessage, getMessagesForRoom } from './types/Message';
import messageService from '../service/messageService';

class MessageController {
	createMessage: createMessage = async (req, res, next) => {
		try {
			const { content, roomId, userId } = req.body;
			const message = await messageService.createMessage(content, roomId, userId);
			return res.json({ message: new MessageDTO(message) });
		} catch (error) {
			next(error);
		}
	};

	getMessagesForRoom: getMessagesForRoom = async (req, res, next) => {
		try {
			const { roomId, userId } = req.params;
			// TODO: add validation ? shoud i need add userId ?

			if (!roomId) return res.status(400).json({ messages: 'Room ID is required' });
			if (!userId) return res.status(400).json({ messages: 'User ID is required' });
            
			await messageService.resetUnreadCounter(roomId, userId); // chek this
			const messages = await messageService.getMessagesForRoom(roomId!);
			const messageDTOs = messages.map((message) => new MessageDTO(message));
			return res.json({ messages: messageDTOs });
			// return res.json({messageDTOs});  chek this
		} catch (error) {
			next(error);
		}
	};
}

export default new MessageController();
