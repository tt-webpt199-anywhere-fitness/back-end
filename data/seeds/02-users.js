exports.seed = function (knex) {
	return knex('users').insert([
		{
			username: 'nick', // **** Will get ID 1
			password: 'abc123',
			role_id: '1',
		},
		{
			username: 'zack', // **** Will get ID 2
			password: 'abc123',
			role_id: '1',
		},
		{
			username: 'amos', // **** Will get ID 3
			password: 'abc123',
			role_id: '1',
		},
		{
			username: 'paul', // **** Will get ID 4
			password: 'abc123',
			role_id: '1',
		},
		{
			username: 'rachel', // ** Will get ID 5
			password: 'abc123',
			role_id: '1',
		},
	]);
};
