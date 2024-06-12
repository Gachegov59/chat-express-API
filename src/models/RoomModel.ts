// import mongoose, { Schema, Document, model } from 'mongoose';
// import { IUser } from './UserModel';

// interface IRoom extends Document {
//   name: string;
//   users: IUser['_id'][];
//   creator: IUser['_id'];
//   createdAt: Date;
// }

// const roomSchema = new Schema<IRoom>({
//   name: { type: String, required: true },
//   users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
//   creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const RoomModel = model<IRoom>('Room', roomSchema);

// export { RoomModel, IRoom };
