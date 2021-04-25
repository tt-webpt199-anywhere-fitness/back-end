exports.up = function (knex) {
	return knex.schema
		.createTable('roles', (tbl) => {
			tbl.increments();
			tbl.string('role_name', 128)
				.notNullable()
				.unique();
		})
		.createTable('locations', (tbl) => {
			tbl.increments();
			tbl.string('location_name', 128).notNullable();
			tbl.string('location_address', 256)
				.notNullable()
				.unique();
		})
		.createTable('users', (tbl) => {
			tbl.increments();
			tbl.string('username', 128)
				.notNullable()
				.unique()
				.index();
			tbl.string('password', 128).notNullable();
			tbl.bigint('role_id')
				.unsigned()
				.references('roles.id')
				.onDelete('RESTRICT')
				.onUpdate('CASCADE')
				.defaultTo(2);
		})
		.createTable('classes', (tbl) => {
			tbl.increments();
			tbl.string('class_name', 128).notNullable();
			tbl.string('class_type', 128).notNullable();
			tbl.datetime('class_start').notNullable();
			tbl.string('class_duration').notNullable();
			tbl.integer('class_intensity').notNullable();
			tbl.integer('class_enrolled').defaultTo(0);
			tbl.integer('class_max').notNullable();
			tbl.bigint('user_id')
				.unsigned()
				.references('users.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.bigint('location_id')
				.unsigned()
				.references('locations.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		})
		.createTable('course_user', (tbl) => {
			tbl.increments();
			tbl.bigint('class_id')
				.unsigned()
				.references('classes.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.bigint('user_id')
				.unsigned()
				.references('users.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('course_user')
		.dropTableIfExists('classes')
		.dropTableIfExists('users')
		.dropTableIfExists('locations')
		.dropTableIfExists('roles');
};
