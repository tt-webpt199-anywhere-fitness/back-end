const db = require('../../data/db-config');

// ?? Create new user ==> POST
async function create({ username, password, role_id }) {
	const [id] = await db('users').insert({
		username,
		password,
		role_id,
	});
	return findById(id);
}

// ?? Find users (id) ==> GET
async function findById(id) {
	const user = db('users')
		.join('roles', 'roles.id', 'users.role_id')
		.select('users.id', 'users.username', 'roles.role_name')
		.where('users.id', id)
		.first();

	const userObj = {
		id: user.id,
		username: user.username,
		role_name: user.role_name,
	};
	return userObj;
}

module.exports = { create, findById };
