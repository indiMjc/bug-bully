exports.seed = function(knex) {
	return knex('projects').then(function() {
		return knex('projects').insert([
			{
				id: 1,
				name: 'Anteaters',
				description: 'Bug and issue tracking for software developers.',
				stakeholder: 3,
				project_manager: 5
			},
			{
				id: 2,
				name: 'DevShop24',
				description: 'A platform for freelance software developers.',
				stakeholder: 3,
				project_manager: null
			},
			{
				id: 3,
				name: 'Plant Purpose',
				description: 'An app that helps users remember their schedule for plant care.',
				stakeholder: null,
				project_manager: 5
			}
		]);
	});
};
