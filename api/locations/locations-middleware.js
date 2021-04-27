const Locations = require('./location-model');

const checkLocationPayload = async (req, res, next) => {
	const payload = req.body;

	if (!payload.location_name || !payload.location_address) {
		next({
			apiCode: 400,
			apiMessage:
				'Location object must contain name and address',
		});
	} else {
		next();
	}
};

const checkLocationId = async (req, res, next) => {
	try {
		const location = await Locations.findById(req.params.id);
		if (location) {
			req.location = location;
			next();
		} else {
			next({
				apiCode: 404,
				apiMessage: `Location with ID ${req.params.id} does not exist`,
			});
		}
	} catch (err) {
		next(err);
	}
};

module.exports = { checkLocationPayload, checkLocationId };
