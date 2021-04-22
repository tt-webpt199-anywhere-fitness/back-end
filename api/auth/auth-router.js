const authRouter = require('express').Router();
const Users = require('../users/users-model');
const { checkUsernameExists, checkPayload } = require('./auth-middleware');
const jwt = require('jsonwebtoken');
const secret = require('../secrets');
const bcrypt = require('bcryptjs');

// TODO POST ==> /api/auth/register ==> Create user
authRouter.post(
	'/register',
	checkUsernameExists,
	checkPayload,
	async (req, res, next) => {
		const credentials = req.body;
		try {
			const hash = bcrypt.hashSync(
				credentials.password,
				10
			);
			credentials.password = hash;

			const user = await Users.create(credentials);
			res.status(201).json(user);
		} catch (err) {
			next(err);
		}
	}
);

// TODO POST ==> /api/auth/login ==> Log in
authRouter.post('/login', checkPayload, async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const [user] = await Users.findBy({
			username: username,
		});
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = generateToken(user);
			res.status(200).json({
				message: `Welcome back, ${user.username}!`,
				token: token,
			});
		} else {
			next({
				apiCode: 401,
				apiMessage: `User ${user.username} does not exist`,
			});
		}
	} catch (err) {
		next({
			apiCode: 500,
			apiMessage: 'Error loggin in',
			...err,
		});
	}
});

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
		// role_name: user.role_name,
	};
	const options = {
		expiresIn: '1 day',
	};
	const token = jwt.sign(payload, secret.jwtSecret, options);

	return token;
}

module.exports = authRouter;
