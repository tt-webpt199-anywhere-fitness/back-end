const locationRouter = require('express').Router();
const Locations = require('./location-model');
const {
	checkLocationPayload,
	checkLocationId,
} = require('./locations-middleware');

// ?? GET ==> /api/locations/:id ==> Return location with specified ID
locationRouter.get('/:id', checkLocationId, (req, res, next) => {
	Locations.findById(req.params.id)
		.then((location) => {
			res.json(location);
		})
		.catch(next);
});

// ?? POST ==> /api/locations ==> Create location
locationRouter.post('/', checkLocationPayload, (req, res, next) => {
	const location = req.body;

	Locations.createLocation(location)

		.then((location) => {
			res.status(201).json(location);
		})
		.catch(next);
});

// ?? PUT ==> /api/locations/:id ==> Update location
locationRouter.put('/:id', checkLocationPayload, async (req, res, next) => {
	const { id } = req.params;
	const location = req.body;

	try {
		const updatedLocation = await Locations.updateLocation(
			id,
			location
		);
		if (location) {
			res.status(200).json(updatedLocation);
		} else {
			next({
				apiCode: 404,
				apiMessage: `The location with the specified ID (${id}) does not exist`,
			});
		}
	} catch (err) {
		next({
			apiCode: 500,
			apiMessage:
				'The location information could not be modified',
			...err,
		});
	}
});

// ?? DELETE ==> /api/locations/:id ==> Delete location
locationRouter.delete('/:id', (req, res, next) => {
	Locations.deleteLocation(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: `Location ID ${req.params.id} has been deleted successfully`,
				});
			} else {
				next({
					apiCode: 404,
					apiMessage: `The location with the specified ID (${req.params.id}) does not exist`,
				});
			}
		})
		.catch((err) => {
			next({
				apiCode: 500,
				apiMessage:
					'The location could not be removed',
				...err,
			});
		});
});

module.exports = locationRouter;
