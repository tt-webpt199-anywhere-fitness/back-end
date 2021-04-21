exports.seed = function (knex) {
	return knex('roles').insert([
		{ role: 'instructor' },
		{ role: 'user' },
	]);
};
