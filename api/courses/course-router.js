const courseRouter = require('express').Router();
const Courses = require('./course-model');
const { checkCoursePayload, checkCourseId } = require('./course-middleware');

// ?? GET ==> /api/courses ==> Return an array of all courses
courseRouter.get('/', (req, res, next) => {
	Courses.findAll()
		.then((courses) => {
			res.json(courses);
		})
		.catch(next);
});

// ?? GET ==> /api/courses/:id
courseRouter.get('/:id', checkCourseId, (req, res, next) => {
	Courses.findById(req.params.id)
		.then((course) => {
			res.json(course);
		})
		.catch(next);
});

// ?? PUT ==> /api/courses/:id ==> Update course information
courseRouter.put('/:id', checkCoursePayload, async (req, res, next) => {
	const { id } = req.params;
	const course = req.body;

	try {
		const updatedCourse = await Courses.updateCourse(
			id,
			course
		);
		if (course) {
			res.status(200).json(updatedCourse);
		} else {
			next({
				apiCode: 404,
				apiMessage: `The course with the specified ID (${id}) does not exist`,
			});
		}
	} catch (err) {
		next({
			apiCode: 500,
			apiMessage:
				'The course information could not be modified',
			...err,
		});
	}
});

// ?? POST ==> /api/courses ==> Create course ==> Return course object
courseRouter.post('/', checkCoursePayload, (req, res, next) => {
	const course = req.body;

	Courses.createCourse(course)
		.then((course) => {
			res.status(201).json(course);
		})
		.catch(next);
});

// ?? DELETE ==> /api/courses/:id ==> Delete course
courseRouter.delete('/:id', (req, res, next) => {
	Courses.deleteCourse(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: `Course ID ${req.params.id} has been deleted successfully`,
				});
			} else {
				next({
					apiCode: 404,
					apiMessage: `The course with the specified ID (${req.params.id}) does not exist`,
				});
			}
		})
		.catch((err) => {
			next({
				apiCode: 500,
				apiMessage:
					'The course could not be removed',
				...err,
			});
		});
});

module.exports = courseRouter;
