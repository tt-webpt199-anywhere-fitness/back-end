exports.seed = function (knex) {
	return knex('users').insert([
		{ username: 'nick', password: 'abc123' },
		{ username: 'zack', password: 'abc123' },
		{ username: 'amos', password: 'abc123' },
		{ username: 'paul', password: 'abc123' },
		{ username: 'rachel', password: 'abc123' },
	]);
};
