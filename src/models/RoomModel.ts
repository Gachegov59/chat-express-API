import mongoose, { Schema, model } from 'mongoose';
import { IRoom } from '../types/Room';

const lastMessageSchema = new Schema({
  text: { type: String, required: true },
  date: { type: String, required: true },
});

const roomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  settings: {
    type: new Schema({
      allowGuests: { type: Boolean, default: true },
    }),
    default: {},
  },
  image: { type: String },
  type: { type: String, enum: ['user', 'group'] },
  counters: {
    type: Map,
    of: Number,
    default: {},
  },
  lastMessage: { type: lastMessageSchema },
  createdAt: { type: Date, default: Date.now },
});

const RoomModel = model<IRoom>('Room', roomSchema);

export { RoomModel };
