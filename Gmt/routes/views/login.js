var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'login';
  view.query('log',keystone.list('Login').model.find());
  view.render('login');
  };
