const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');

// ?? checkUsernameExists ==> Verify that username exists in the database
const checkUsernameExists = async (req, res, next) => {
	try {
		let { username, password } = req.body;
		const user = await Users.findBy({ username }).first();
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
	checkUsernameExists,
	checkBodyContents,
};
