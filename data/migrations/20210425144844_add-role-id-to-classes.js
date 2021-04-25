exports.up = function (knex) {
	return knex.schema.table('classes', function (tbl) {
		tbl.bigint('role_id')
			.unsigned()
			.references('roles.id')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.table('classes', function (tbl) {
		tbl.dropColumn('role_id');
	});
};
