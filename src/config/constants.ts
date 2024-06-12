type obejctString = {
	[key: string]: string;
};
class Endpoints {
	USER: obejctString = {
		USERS_BASE_ROUTE: '/api/user',
		REGISTERATION: '/registration',
		LOGIN: '/login',
		LOGOUT: '/logout',
		ACTIVATE_LINK: '/activate/:link',
		REFRESH: '/refresh',
		USERS: '/users',
	};
	ROOM: obejctString = {
		ROOM_BASE_ROUTE: '/api/room',
		CREATE: '/create',
		DELETE: '/delete/:id',
		INVITE: '/invite',
		LEAVE: '/leave',
		GET_ROOMS: '/user/:userId',
	};
}

class Errors {
	ENTITY_NOT_FOUND_MESSAGE = 'Entity not found!';
	INVALID_QUERY_PARAMETERS_MESSAGE = 'Invalid query parameters!';
	AUTHENTICATION_FAILED_MESSAGE = 'Authentication failed!';
	USER_WITH_THIS_EMAIL_ALREADY_EXIST = 'User with this email already exist😕';
	USER_WITH_THIS_EMAIL_NOT_FOUND = 'User with this email not found';
	USER_IS_NOT_AUTHORIZED = 'User is not authorized';
	INVALID_LINK_ACTIVATION = 'Invalid link activation';
	UNEXPECTED_SERVER_ERROR = 'Unexpected server error😒';
	USER_NOT_FOUND = 'User not found';
	WRONG_PASSORD = 'Wrong passord';
}

class Services {
	MAIL: obejctString = {
		LINK_ACTIVATE: 'http://localhost:5000/api/user/activate',
	};
}

export const endpoints = new Endpoints();
export const errors = new Errors();
export const services = new Services();
