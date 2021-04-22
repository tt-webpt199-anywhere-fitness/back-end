exports.seed = function (knex) {
	return knex('locations').insert([
		{
			location_name: "Ross's Gym",
			location_address:
				'55647 West Rd, Trenton, MI 48183',
		},
	]);
};
