// import mongoose, { Schema, Document, model } from 'mongoose';
// import { IUser } from './User';
// import { IRoom } from './RoomModel';

// interface IMessage extends Document {
//   sender: IUser['_id'];
//   content: string;
//   room: IRoom['_id'];
//   createdAt: Date;
// }

// const messageSchema = new Schema<IMessage>({
//   sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   content: { type: String, required: true },
//   room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const MessageModel = model<IMessage>('Message', messageSchema);

// export { MessageModel, IMessage };
