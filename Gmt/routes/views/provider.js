var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'provider';
	locals.provider = {
		"name": "I am a provider. I rule"
	};
	view.render('provider');
};
