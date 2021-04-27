const db = require('../../data/db-config');

// ?? findById(id) ==> GET ==> Find specified location

function findById(id) {
	return db('locations').where({ id }).first();
}

// ?? createLocation() ==> POST ==> Create new location

const createLocation = async (location) => {
	const [newLocation] = await db('locations').insert(location);

	const locationObj = {
		id: newLocation,
		location_name: location.location_name,
		location_address: location.location_address,
	};

	return locationObj;
};

// ?? updateLocation(id) ==> PUT ==> Update location information
const updateLocation = async (id, location) => {
	const updatedLocation = await db('locations')
		.update(location)
		.where({ id });

	const locationObj = {
		location_name: location.location_name,
		location_address: location.location_address,
	};

	return locationObj;
};

// ?? deleteLocation(id) ==> DELETE ==> Delete specified location
async function deleteLocation(id) {
	return await db('locations').del().where({ id });
}

module.exports = { findById, createLocation, updateLocation, deleteLocation };
