import { Document } from 'mongoose';

interface UserSettings {
	theme: 'light' | 'dark';
	language: 'en' | 'ru' | 'iw';
}

// interface IUser {
// 	id: string;
//     firstName: string;
// 	lastName: string;
// 	status: boolean;
// 	avatar?: string;
// 	chatRooms?: [];
// }


interface IUser extends Document {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  avatar?: string;
  settings: UserSettings;
  isActivated: boolean;
  activationLink?: string;
  status: boolean;
  chatRooms?: [];
}

// export { IUser, UserSettings };

export { IUser, UserSettings };