const userRouter = require('express').Router();
const Users = require('./users-model');
const { restricted, checkRole } = require('./users-middleware');

// ?? GET ==> /api/users ==> Return array of all users

userRouter.get('/', restricted, (req, res, next) => {
	Users.findAll()
		.then((users) => {
			res.json(users);
		})
		.catch(next);
});

// TODO GET ==> /api/users/:id ==> Return user with specified ID

userRouter.get('/:id', (req, res, next) => {
	Users.findById(req.params.id)
		.then((user) => {
			res.json(user);
		})
		.catch(next);
});

module.exports = userRouter;
