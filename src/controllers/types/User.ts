import UserDTO from '../../dtos/user.dto';
import { ControllerFunction } from '../types/ControllerBase';

interface IUserCreateReqBody {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

interface IUserCreateResBody {
	user: UserDTO;
	accessToken: string;
	refreshToken: string;
}

export type registrationUser = ControllerFunction<{}, IUserCreateResBody, IUserCreateReqBody, {}>;

export type loginUser = ControllerFunction<{}, {}, IUserCreateReqBody, {}>;
export type logoutUser = ControllerFunction;
export type activateUser = ControllerFunction<{ link: string }, {}, {}, {}>;
export type refreshTokenUser = ControllerFunction;
// export type getUsers = ControllerFunction<{}, {}, {}, {}>;
export type getUsers = ControllerFunction
