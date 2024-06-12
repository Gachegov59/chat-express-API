import mongoose, { Schema, model } from 'mongoose';
import { IRoom } from '../types/Room';

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
});

const RoomModel = model<IRoom>('Room', roomSchema);

export { RoomModel };
