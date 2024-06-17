import { ApiError } from '../exceptions/app-error';
import { RoomModel } from '../models/RoomModel';
import { UserModel } from '../models/UserModel';
import { Types } from 'mongoose';

class roomService {
	async createRoom(name: string, userId: string) {
		const room = await RoomModel.create({
			name,
			users: [new Types.ObjectId(userId)],
			creator: new Types.ObjectId(userId),
			settings: { allowGuests: true },
			counter: 0,
			createdAt: new Date(),
		});
		return room;
	}

	async inviteUserToRoom(roomId: string, userId: string) {
		const room = await RoomModel.findById(roomId);
		if (!room) throw ApiError.BadRequest('Room not found');
		room.users.push(new Types.ObjectId(userId));
		await room.save();
		return room;
	}

	async leaveRoom(roomId: string, userId: string) {
		const room = await RoomModel.findById(roomId);
		if (!room) throw ApiError.BadRequest('Room not found');
		room.users = room.users.filter((id) => id.toString() !== userId);
		await room.save();
	}

	async deleteRoom(roomId: string, userId: string) {
		const room = await RoomModel.findById(roomId);
		if (!room) throw ApiError.BadRequest('Room not found');
		if (room.creator.toString() !== userId) {
			// throw ApiError.Forbidden('Only the creator can delete the room');
			throw ApiError.BadRequest('Only the creator can delete the room');
		}
		await RoomModel.deleteOne({ _id: roomId });
	}

	async getRoomsForUser(userId: string) {
		const rooms = await RoomModel.find({ users: userId });
		return rooms;
	}
}

export default new roomService();
