import { Types } from 'mongoose';
import { IRoom } from '../types/Room';

type RoomTOConstructor = Pick<IRoom, 'name' | 'users' | 'creator'> & { _id: Types.ObjectId };

class RoomDTO {
  id: string;
  name: string;
  users: string[];
  creator: string;

  constructor(model: RoomTOConstructor) {
    this.id = model._id.toString();
    this.name = model.name;
    this.users = model.users.map(user => user.toString());
    this.creator = model.creator.toString();
  }
}

export default RoomDTO;
