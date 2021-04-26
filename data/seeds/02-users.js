exports.seed = function (knex) {
	return knex('users').insert([
		{ username: 'nick', password: 'abc123', role_id: 1 }, // ** Will get ID 1
	]);
};
