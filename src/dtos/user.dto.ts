// type UserTOConstructor = { email: string; _id: string; isActivated: boolean };
import { ObjectId, Types } from 'mongoose';
import { IUser } from '../types/User';

type UserTOConstructor = Pick<IUser, 'email' | 'isActivated' | 'firstName' | 'lastName'> & {
	_id: Types.ObjectId;
};
class UserDTO {
	email: string;
	id: string;
	isActivated: boolean;
	firstName: string;
	lastName: string;

	constructor(model: UserTOConstructor) {
		this.email = model.email;
		this.id = model._id.toString();
		this.isActivated = model.isActivated;
		this.firstName = model.firstName;
		this.lastName = model.lastName;
	}
}

export default UserDTO;
