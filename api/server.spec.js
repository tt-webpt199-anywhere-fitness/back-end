const db = require('../data/db-config');
const server = require('./server');
const request = require('supertest');

test('sanity test', () => {
	expect(true).toEqual(true);
});

// ?? Server batch
describe('server', () => {
	// ?? Check environment
	test('we are in testing environment', () => {
		expect(process.env.NODE_ENV).toBe('testing');
	});
});

// ?? User ==> to be used in all tests
const user = { username: 'bobross', password: 'abc123' };

// ?? Res ==> to be used in all tests
let res;
beforeEach(async () => {
	res = await request(server).post('/');
});

// ?? beforeAll ==> rollback(), latest() migration
beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

// ?? afterAll ==> destroy() database
afterAll(async () => {
	await db.destroy();
});
