var keystone = require('keystone');
var fnjs = require('fn.js');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);

	res.locals.treatments = [];

	var doctorQuery = keystone.list('Doctor').model.findOne({
		key: req.params.key
	});

	view.on('init', function(next) {
		doctorQuery.exec(function(err, docRes) {
			res.locals.doctor = docRes;
			docRes.getTreatments(function(er, treatRes) {
				fnjs.each(function(treat) {
					res.locals.treatments.push(treat);
				}, treatRes);
			});
			next();
		});
	});
	view.render('doctor');
};
