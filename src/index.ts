import 'dotenv/config';
const PORT = process.env.PORT || 3000;
import { App } from './app';
import { connectChatDb } from './db/mongoose';

const {app, server} = App();

connectChatDb()
	.then(() => {
		server.listen(PORT, () => {
			console.log(`http://localhost:${PORT}`);
		});
	})
	.catch((err) => console.log('catch index----',err));

