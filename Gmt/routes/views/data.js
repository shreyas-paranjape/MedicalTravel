var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	res.locals.procedure = [];
	view.query("procedure", keystone.list('Procedure').model.findOne({
		key: req.params.key
	}).populate('doctors').populate('providers'));
		view.render('data');
};
