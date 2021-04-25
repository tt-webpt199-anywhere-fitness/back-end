const db = require('../../data/db-config');

// ?? findAll ==> GET
function findAll() {
	return db('classes as C')
		.leftJoin('users as U', 'C.user_id', 'U.id')
		.leftJoin('locations as L', 'C.location_id', 'L.id')
		.select(
			'C.id',
			'U.username as instructor',
			'C.class_name as course',
			'C.class_type as course type',
			'C.class_start as date and time',
			'C.class_duration as duration',
			'C.class_intensity as intensity',
			'C.class_enrolled as students enrolled',
			'C.class_max as max class size',
			'L.location_name as location',
			'L.location_address as location address'

			// 'U.role_id'
		)
		.orderBy('C.id');
}

// TODO findById(id) ==> GET

// TODO findBy(filter) ==> GET

// TODO createCourse ==> POST
const createCourse = async (course) => {
	const [newCourse] = await db('classes as C')
		.leftJoin('locations as L', 'L.id', 'classes.location_id')
		.leftJoin('users as U', 'U.id', 'C.user_id')
		// .leftJoin('roles as R', 'R.id', 'U.role_id')
		.select(
			'C.id',
			'C.class_name',
			'C.class_type',
			'C.class_start',
			'C.class_duration',
			'C.class_intensity',
			'C.class_enrolled',
			'C.class_max',
			'L.location_name',
			'L.location_address',
			'U.username'
			// 'R.role_name'
		)
		.insert(course);
	console.log('course =====> ', course);

	const newCourseObj = {
		id: newCourse,
		course_instructor: course.username,
		course_name: course.class_name,
		course_type: course.class_type,
		course_start: course.class_start,
		course_duration: course.class_duration,
		course_intensity: course.class_intensity,
		course_enrolled: course.class_enrolled,
		course_max: course.class_max,
		location_name: course.location_name,
		location_address: course.location_address,
	};
	return newCourseObj;
};

// TODO updateCourse ==> PUT

// TODO deleteCourse ==> DELETE

module.exports = {
	findAll,
	// findById,
	// findBy,
	createCourse,
	// updateCourse,
	// deleteCourse,
};
