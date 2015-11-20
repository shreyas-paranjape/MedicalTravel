var keystone = require('keystone');
var fnjs = require('fn.js');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);

	res.locals.procedures = [];

	var doctorQuery = keystone.list('Doctor').model.findOne({
		key: req.params.key
	});

	view.on('init', function(next) {
		doctorQuery.exec(function(err, docRes) {
			res.locals.doctor = docRes;
			docRes.getProcedures(function(er, procRes) {
				fnjs.each(function(proc) {
					res.locals.procedures.push(proc);
				}, procRes);
			});
			next();
		});
	});
	view.render('doctor');
};
