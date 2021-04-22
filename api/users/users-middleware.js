const jwt = require('jsonwebtoken');
const secret = require('../secrets');

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

module.exports = { restricted, checkRole };
