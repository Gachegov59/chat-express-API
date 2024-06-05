export interface IMenuChat {
	id: string;
	image: string;
	name: string;
	type: 'user' | 'group';
	counter: number;
	lastMessage: {
		text: string;
		date: string;
	};
}

export interface IChatMessage {
	user: IUser;
	messageId: string;
	userAvatar: string;
	isMine: boolean;
	date: string;
	messages: IChatMessageItem[];
}

export interface ICurrentChat {
	chatId: string;
	type: 'personal' | 'group';
	name: string;
	owner: {
		ownerId: string;
		name: string;
	};
	members: IUser[];
	isRead: boolean;
}

interface IChatMessageItem {
	id: string;
	userId: string;
	type: 'text' | 'image' | 'audio' | 'video';
	content: string;
	date: string;
	isRead: boolean;
}

interface IUser {
	id: string;
	name: string;
	surname: string;
	status: boolean;
	middleName?: string;
	chats?: [];
	role?: string;
	photoId?: string;
	account?: string;
}
