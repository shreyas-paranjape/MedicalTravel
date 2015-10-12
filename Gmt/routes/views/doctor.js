var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'doctor';
	locals.doctor = {
		"name": "I am a doctor."
	};
	view.render('doctor');
};
