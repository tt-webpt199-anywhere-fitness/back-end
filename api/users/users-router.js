const userRouter = require('express').Router();
const Users = require('./users-model');
const Courses = require('../courses/course-model');
const { checkUserId } = require('./users-middleware');
const { checkPayload } = require('../auth/auth-middleware');

// ?? GET ==> /api/users ==> Return array of all users

userRouter.get(
	'/',
	/*restricted,*/ (req, res, next) => {
		Users.findAll()
			.then((users) => {
				res.json(users);
			})
			.catch(next);
	}
);

// ?? GET ==> /api/users/:id ==> Return user with specified ID

userRouter.get('/:id', checkUserId, (req, res, next) => {
	Users.findById(req.params.id)
		.then((user) => {
			res.json(user);
		})
		.catch(next);
});

// ?? GET ==> /api/users/:id/courses ==> Return array of courses tied to user_id
userRouter.get('/:id/courses', checkUserId, (req, res, next) => {
	const { id } = req.params;
	Courses.findCourses(id)
		.then((courses) => {
			res.json(courses);
		})
		.catch(next);
});

// ?? PUT ==> /api/users/:id ==> Update user information
userRouter.put('/:id', checkPayload, async (req, res, next) => {
	const { id } = req.params;
	const user = req.body;

	try {
		const updatedUser = await Users.updateUser(id, user);
		console.log('updatedUser =====> ', updatedUser);
		if (user) {
			res.status(200).json(updatedUser);
		} else {
			next({
				apiCode: 404,
				apiMessage: `The user with the specified ID (${id}) does not exist`,
			});
		}
	} catch (err) {
		next({
			apiCode: 500,
			apiMessage:
				'The user information could not be modified',
			...err,
		});
	}
});

// ?? DELETE ==> /api/users/:id ==> Delete user
userRouter.delete('/:id', (req, res, next) => {
	Users.deleteUser(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: `User ID ${req.params.id} has been deleted successfully`,
				});
			} else {
				next({
					apiCode: 404,
					apiMessage: `The user with the specified ID (${req.params.id}) does not exist`,
				});
			}
		})
		.catch((err) => {
			next({
				apiCode: 500,
				apiMessage:
					'The user could not be removed',
				...err,
			});
		});
});

module.exports = userRouter;
