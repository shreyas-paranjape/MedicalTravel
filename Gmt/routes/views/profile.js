var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'profile';
  view.query('pro',keystone.list('Profile').model.find());
  view.render('profile');
  };
