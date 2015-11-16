var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'signup';
  view.query('sign',keystone.list('Signup').model.find());
  view.render('signup');
  };
