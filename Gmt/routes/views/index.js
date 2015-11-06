var keystone = require('keystone');
var fn = require('fn.js');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'home';
	view.render('index');

};
