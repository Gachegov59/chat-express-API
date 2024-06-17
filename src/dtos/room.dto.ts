import { Types } from 'mongoose';
import { IRoom } from '../types/Room';

class RoomDTO {
	id: string;
	name: string;
	users: string[];
	creator: string;
	settings: {
		allowGuests: boolean;
	};
	counter: number;
	createdAt: Date;

	constructor(room: IRoom, userId: string) {
		this.id = room._id.toString();
		this.name = room.name;
		this.users = room.users.map((user) => user.toString());
		this.creator = room.creator.toString();
		this.settings = room.settings;
		this.counter = room.counters.get(userId) || 0; 
		this.createdAt = room.createdAt;
	}
}

export default RoomDTO;
