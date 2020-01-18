const router = require('express').Router();

const restricted = require('../auth/auth-middleware');

const Projects = require('../models/projects-model');

// Search for project by name, use String.prototype.toLowerCase() on FE
router.get('/search/:query', restricted, (req, res) => {
	Projects.findProjectBy({ lowercase_name: req.params.query })
		.then(project => {
			project && delete project.lowercase_name;
			project
				? res.status(200).json(project)
				: res.status(401).json({ message: 'No project by that name' });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Error while searching for project' });
		});
});

// GET projects with array of assigned devs
router.get('/:id', restricted, (req, res) => {
	Projects.findProject(req.params.id)
		.then(project => {
			project
				? res.status(200).json(project)
				: res.status(401).json({ message: 'Could not find project' });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Error getting project' });
		});
});

module.exports = router;
