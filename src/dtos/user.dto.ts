// type UserTOConstructor = { email: string; _id: string; isActivated: boolean };
import { ObjectId, Types } from 'mongoose';
import { IUser } from '../types/User';

type UserTOConstructor = Pick<IUser, 'email' | 'isActivated'> & { _id: Types.ObjectId };
class UserDTO {
	email: string;
	id: string;
	isActivated: boolean;

	constructor(model: UserTOConstructor){
		this.email = model.email;
		this.id = model._id.toString();
		this.isActivated = model.isActivated;
	}
}

export default UserDTO;
