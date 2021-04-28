const Courses = require('./course-model');

const checkCoursePayload = async (req, res, next) => {
	const payload = req.body;

	if (!payload.class_name) {
		next({
			apiCode: 400,
			apiMessage:
				'Course object must contain a course name',
		});
	} else if (!payload.class_type) {
		next({
			apiCode: 400,
			apiMessage:
				'Course object must contain a course type',
		});
	} else if (!payload.class_start) {
		next({
			apiCode: 400,
			apiMessage:
				'Course object must contain a start time',
		});
	} else if (!payload.class_duration) {
		next({
			apiCode: 400,
			apiMessage:
				'Course object must contain a course duration',
		});
	} else if (!payload.class_intensity) {
		next({
			apiCode: 400,
			apiMessage:
				'Course object must contain a course intensity',
		});
	} else if (!payload.class_max) {
		next({
			apiCode: 400,
			apiMessage:
				'Course object must contain a course maximum',
		});
	} else if (!payload.location_id) {
		next({
			apiCode: 400,
			apiMessage:
				'Course object must contain a location id',
		});
	} else {
		next();
	}
};

const checkCourseId = async (req, res, next) => {
	try {
		const course = await Courses.findById(req.params.id);
		if (course) {
			req.course = course;
			next();
		} else {
			next({
				apiCode: 404,
				apiMessage: `Course with ID ${req.params.id} does not exist`,
			});
		}
	} catch (err) {
		next(err);
	}
};

module.exports = { checkCoursePayload, checkCourseId };
