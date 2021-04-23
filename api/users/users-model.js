const db = require('../../data/db-config');

// ?? Find all users ==> GET
function findAll() {
	return db('users')
		.join('roles', 'roles.id', 'users.role_id')
		.select('users.id', 'users.username', 'roles.role_name')
		.orderBy('users.id');
}
// ?? Create new user ==> POST
async function create(user) {
	const [id] = await db('users').insert(user);
	return findById(id);
}

// ?? Find user (id) ==> GET
function findById(id) {
	return db('users')
		.join('roles', 'roles.id', 'users.role_id')
		.select('users.id', 'users.username', 'roles.role_name')
		.where('users.id', id)
		.first();
}

// ?? Find user (filter) ==> GET
function findBy(filter) {
	return db('users').where(filter).orderBy('id');
}

// ?? Update user (id) ==> PUT
async function updateUser(id, user) {
	return await db('users')
		.update(user)
		.where({ id })
		.join('roles', 'roles.id', 'users.role_id')
		.select(
			'users.id',
			'users.username',
			'users.password',
			'roles.role_name'
		);
}

// ?? Delete user (id) ==> DELETE
async function deleteUser(id) {
	return await db('users').del().where({ id });
}

module.exports = { findAll, create, findById, findBy, updateUser, deleteUser };
