var keystone = require('keystone');
var fnjs = require('fn.js');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'provider_info';

	res.locals.doctors = [];
	res.locals.procedures = [];

	view.query("provider", keystone.list('Provider').model.findOne({
		key: req.params.key
	}).populate('doctors'));

	var contains = function(aValue, aArray) {
		var idx;
		for (idx = 0; idx < aArray.length; idx++) {
			if (aValue._id.equals(aArray[idx]._id)) {
				return true;
			}
		}
		return false;
	}
	var ProvQuery = keystone.list('Provider').model.findOne({
		key: req.params.key
	});
	view.on('init', function(next) {
		ProvQuery.exec(function(err, provRes) {

			provRes.getProcedure(function(e, procedureRes) {
				fnjs.each(function(procedure) {
					if (!contains(procedure, res.locals.procedures)) {
						locals.procedures.push(procedure);
						console.log("procedure:   " + procedure);
					}
				}, procedureRes);
			});
		});
		next();
	});
	view.render('provider_info');
};
