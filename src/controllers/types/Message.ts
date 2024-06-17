import MessageDTO from '../../dtos/message.dto';
import { ControllerFunction } from '../types/ControllerBase';

interface ICreateMessageReqBody {
	content: string;
	roomId: string;
	userId: string;
}

interface ICreateMessageResBody {
	message: MessageDTO;
}

interface IGetMessagesForRoomReqParams {
	roomId?: string;
	userId?: string;
}
interface IGetMessagesForRoomReqBody {
	messages: MessageDTO[] | string;
}

export type createMessage = ControllerFunction<{}, ICreateMessageResBody, ICreateMessageReqBody, {}>;
export type getMessagesForRoom = ControllerFunction<
	IGetMessagesForRoomReqParams,
	IGetMessagesForRoomReqBody,
	{},
	{}
>;
