const Users = require('./users-model');
const db = require('../../data/db-config');

test('sanity test', () => {
	expect(true).toEqual(true);
});

// ?? user ==> to be used in all tests
const user = { username: 'bobross', password: 'abc123' };

// ?? beforeAll ==> rollback(), latest() migration
beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

// ?? beforeEach ==> truncate() database
beforeEach(async () => {
	await db('users').truncate();
});

// ?? afterAll ==> destroy() database
afterAll(async () => {
	await db.destroy();
});

// ?? users-model batch of tests
describe('users-model', () => {
	// ?? create() batch of tests
	describe('create()', () => {
		test('creates user in database', async () => {
			console.log('user', user);
			await Users.create(user);

			const users = await db('users');
			expect(users).toHaveLength(1);
		});
		test('database contains expected data', async () => {
			await Users.create(user);

			const expected = [
				{
					id: 1,
					username: 'bobross',
					password: 'abc123',
					role_name: 'instructor',
				},
			];
			const users = await db('users');
			expect(users).toEqual(expected);
		});
	});
});
