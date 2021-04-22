const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');

// ?? checkUsernameExists ==> Verify that username does not exist in the database
const checkUsernameExists = async (req, res, next) => {
	try {
		let { username } = req.body;
		const user = await Users.findBy({ username }).first();
		console.log('user =====> ', user);
		if (user) {
			next({
				apiCode: 401,
				apiMessage: 'Username already exists',
			});
		} else {
			next();
		}
	} catch (err) {
		next({
			apiCode: 500,
			apiMessage: 'Error validating credentials',
			...err,
		});
	}
};

const checkPayload = async (req, res, next) => {
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
	checkUsernameExists,
	checkPayload,
};
