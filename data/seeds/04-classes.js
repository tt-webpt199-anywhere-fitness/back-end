exports.seed = function (knex) {
	return knex('classes').insert([
		{
			class_name: 'Pumping Iron',
			class_type: 'Weight Lifting',
			class_start: '04/25/2021 05:00 PM',
			class_duration: '1 hour',
			class_intensity: 4,
			class_enrolled: 7,
			class_max: 15,
			user_id: 1,
			location_id: 1,
		},
	]);
};
