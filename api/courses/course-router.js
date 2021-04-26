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

// ?? POST ==> /api/courses ==> Create course ==> Return course object
courseRouter.post('/', checkCoursePayload, (req, res, next) => {
	const course = req.body;

	Courses.createCourse(course)
		.then((course) => {
			res.status(201).json(course);
		})
		.catch(next);
});

module.exports = courseRouter;
