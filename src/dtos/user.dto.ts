type UserTOConstructor = { email: string; _id: string; isActivated: boolean };

class UserDTO {
	email: string;
	id: string;
	isActivated: boolean;

	constructor(model: UserTOConstructor){
		this.email = model.email;
		this.id = model._id;
		this.isActivated = model.isActivated;
	}
}

export default UserDTO;
