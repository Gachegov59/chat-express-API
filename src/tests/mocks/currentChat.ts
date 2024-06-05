import { ICurrentChat } from './types';

export const currentChatAPI: ICurrentChat = {
	chatId: '254424131',
	type: 'personal',
	name: 'Петя',
	owner: {
		ownerId: '123123edasd34',
		name: 'Петя'
	},
	members: [
		{
			id: '123123edasd34',
			name: 'Петя',
			surname: 'Петров',
			role: 'owner',
			status: true
		}
	],
	isRead: true
};