var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'facility';
	locals.facility = {
		"name": "I am a facility. I rule"
	};
	view.render('facility');
};
