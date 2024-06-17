import { Server } from 'socket.io';
import { MessageModel } from './models/MessageModel';

export default function setupSocket(server: any) {
	const io = new Server(server, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
			allowedHeaders: ['Content-Type'],
			credentials: true,
		},
	});

	io.on('connection', (socket) => {
		console.log('a user connected');

		socket.on('disconnect', () => {
			console.log('user disconnected');
		});

		socket.on('joinRoom', (roomId) => {
			socket.join(roomId);
			console.log(`User joined room: ${roomId}`);
		});

		socket.on('leaveRoom', (roomId) => {
			socket.leave(roomId);
			console.log(`User left room: ${roomId}`);
		});

		socket.on('chatMessage', async (msg) => {
			const { roomId, message, sender } = msg;
			if (!roomId || !message || !sender) {
				console.error('Invalid message data:', msg);
				return;
			}
			try {
				const chatMessage = new MessageModel({ room: roomId, content: message, sender });
				await chatMessage.save();
				io.to(roomId).emit('chatMessage', chatMessage);
			} catch (error) {
				console.error('Error saving message:', error);
			}
		});
	});

	return io;
}
