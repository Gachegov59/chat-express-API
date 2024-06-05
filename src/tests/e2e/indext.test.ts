import request from 'supertest';
import { type Express } from 'express-serve-static-core';
import { App } from '../../app';

describe('/api/users', () => {
	let app: Express;

	beforeAll(() => {
		app = App();
	});

	it('should return empty array when getting /api/users', async () => {
		const response = await request(app).get('/api/users');
        expect(response.body).toStrictEqual([]);
	});
});
