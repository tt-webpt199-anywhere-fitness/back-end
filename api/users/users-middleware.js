const jwt = require('jsonwebtoken');
const secret = require('../secrets');
const Users = require('./users-model');

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
				apiMessage:
					'You must be logged in to view this page',
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

const checkUserId = async (req, res, next) => {
	try {
		const user = await Users.findById(req.params.id);
		if (user) {
			req.user = user;
			next();
		} else {
			next({
				apiCode: 404,
				apiMessage: `User with ID ${req.params.id} does not exist`,
			});
		}
	} catch (err) {
		next(err);
	}
};

module.exports = { restricted, checkRole, checkUserId };
