const jwt = require('jsonwebtoken');
const secret = require('../secrets');
const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');

// ?? restricted ==> Checks for valid token
const restricted = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];

		if (token) {
			jwt.verify(
				token,
				secret.jwtSecret,
				(err, decodedToken) => {
					if (err) {
						next({
							apiCode: 401,
							apiMessage:
								'Token invalid',
						});
					} else {
						req.decodedToken = decodedToken;
						next();
					}
				}
			);
		} else {
			next({
				apiCode: 401,
				apiMessage: 'Token required',
			});
		}
	} catch (err) {
		next({
			apiCode: 500,
			apiMessage: 'Error validatoing credentials',
			...err,
		});
	}
};

// ?? checkRole ==> Restricts access for creating classes to Instructor role
const checkRole = (role_name) => (req, res, next) => {
	if ((req?.decodedToken?.role_name || '') === role_name) {
		next();
	} else {
		next({ apiCode: 403, apiMessage: 'Access denied' });
	}
};

// ?? checkUsernameExists ==> Verify that username exists in the database
const checkUsernameExists = async (req, res, next) => {
	try {
		let { username, password } = req.body;
		const user = await Users.findById({ username }).first();
		if (user && bcrypt.compareSync(password, user.password)) {
			next();
		} else {
			next({
				apiCode: 401,
				apiMessage: 'Invalid credentials',
			});
		}
	} catch (err) {
		next({
			apiCode: 500,
			apiMessage: 'Error validating credentials',
			...err,
		});
	}
};

const checkBodyContents = async (req, res, next) => {
	const credentials = req.body;
	const valid = Boolean(
		credentials.username &&
			credentials.password &&
			typeof credentials.password === 'string'
	);

	if (valid) {
		next();
	} else {
		next({
			apiCode: 422,
			apiMessage:
				'Please provide username and password',
		});
	}
};

module.exports = {
	restricted,
	checkRole,
	checkUsernameExists,
	checkBodyContents,
};
