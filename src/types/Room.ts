import { Document, Types } from 'mongoose';

interface RoomSettings {
  allowGuests: boolean;
}
interface LastMessage {
  text: string;
  date: string;
}
interface IRoom extends Document {
  id: string;
  name: string;
  users: Types.ObjectId[];
  creator: Types.ObjectId;
  settings: RoomSettings;
  createdAt: Date;
  image?: string;
  type?: 'user' | 'group';
  counters: Map<string, number>;
  lastMessage?: LastMessage;
}

export { IRoom, RoomSettings };
