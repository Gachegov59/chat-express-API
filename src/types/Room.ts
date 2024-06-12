import { Document, Types } from 'mongoose';

interface RoomSettings {
  allowGuests: boolean;
}

interface IRoom extends Document {
  id: string;
  name: string;
  users: Types.ObjectId[];
  creator: Types.ObjectId;
  settings?: RoomSettings;
  createdAt: Date;
}

export { IRoom, RoomSettings };
