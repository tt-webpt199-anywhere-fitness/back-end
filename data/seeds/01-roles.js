exports.seed = function (knex) {
	return knex('roles').insert([
		{ role_name: 'instructor' }, // ** Will get ID 1
		{ role_name: 'user' }, // ******** Will get ID 2
	]);
};
