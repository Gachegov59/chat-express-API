import RoomDTO from '../../dtos/room.dto';
import { ControllerFunction } from '../types/ControllerBase';

interface ICreateRoomReqBody {
	name: string;
	userId: string;
}

interface ICreateRoomResBody {
	room: RoomDTO;
}

interface IInviteUserToRoomReqBody {
	roomId: string;
	userId: string;
}

interface ILeaveRoomReqBody {
	roomId: string;
	userId: string;
}

interface IDeleteRoomReqBody {
	roomId: string;
	userId: string;
}

interface IGetRoomsForUserBody {
	userId: string;
}

export type createRoom = ControllerFunction<{}, ICreateRoomResBody, ICreateRoomReqBody, {}>;
export type inviteUserToRoom = ControllerFunction<{}, {}, IInviteUserToRoomReqBody, {}>;
export type leaveRoom = ControllerFunction<{}, {}, ILeaveRoomReqBody, {}>;
export type deleteRoom = ControllerFunction<{}, {}, IDeleteRoomReqBody, {}>;
export type getRoomsForUser = ControllerFunction<{}, {}, IGetRoomsForUserBody, {}>;
