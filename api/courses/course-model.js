const db = require('../../data/db-config');

// TODO findAll ==> GET
function findAll() {
	return db('classes')
		.leftJoin('users', 'classes.user_id', 'users.id')
		.leftJoin('locations', 'class.location_id', 'locations.id');
}

// TODO findById(id) ==> GET

// TODO findBy(filter) ==> GET

// TODO createCourse ==> POST

// TODO updateCourse ==> PUT

// TODO deleteCourse ==> DELETE

module.exports = {
	findAll,
	findById,
	findBy,
	createCourse,
	updateCourse,
	deleteCourse,
};
