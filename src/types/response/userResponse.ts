import UserDTO from "../../dtos/user.dto";

export interface IUserCreateRes {
	user: UserDTO;
    accessToken: string;
    refreshToken: string;
}
