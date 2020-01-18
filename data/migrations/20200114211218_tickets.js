const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

exports.up = tbl => {
	return tbl.schema.createTable('tickets', tbl => {
		tbl.increments();

		tbl.string('title', 128).notNullable();

		tbl.string('category', 128).notNullable();

		tbl.text('description', 1000).notNullable();

		tbl.string('urgency', 128).notNullable();

		tbl.boolean('resolved')
			.notNullable()
			.defaultTo(0);

		tbl.boolean('in_progress')
			.notNullable()
			.defaultTo(0);

		tbl.timestamp('created_at', { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());

		tbl.integer('submitted_by')
			.unsigned()
			.references('username')
			.inTable('users')
			.onDelete('SET NULL')
			.onUpdate('CASCADE');

		tbl.integer('project_id')
			.notNullable()
			.unsigned()
			.references('id')
			.inTable('projects')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = tbl => {
	return tbl.schema.dropTableIfExists('tickets');
};
