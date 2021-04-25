exports.seed = function (knex) {
	return knex('classes').insert([
		{
			class_name: 'Pumping Iron',
			class_type: 'Weight Lifting',
			class_start: '04/25/2021 05:30 PM',
			class_duration: '1 hour',
			class_intensity: 4,
			class_enrolled: 5,
			class_max: 12,
			location_id: 1,
		},
	]);
};
