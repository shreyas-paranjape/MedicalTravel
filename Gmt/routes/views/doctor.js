var keystone = require('keystone');
var fnjs = require('fn.js');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	res.locals.procedures = [];
	res.locals.providers = [];
	res.locals.speciality = [];
	var contains = function(aValue, aArray) {
		var idx;
		for (idx = 0; idx < aArray.length; idx++) {
			if (aValue._id.equals(aArray[idx]._id)) {
				return true;
			}
		}
		return false;
	}

	var doctorQuery = keystone.list('Doctor').model.findOne({
		key: req.params.key
	});

	view.on('init', function(next) {
		doctorQuery.exec(function(err, doctorRes) {
			res.locals.doctor = doctorRes;
			doctorRes.getProcedures(function(er, procedureRes) {
				fnjs.each(function(procedure) {
					if (!contains(procedure, res.locals.procedures)) {
						res.locals.procedures.push(procedure);
					}
					fnjs.each(function(provider) {
						if (!contains(provider, res.locals.providers)) {
							res.locals.providers.push(provider);
						}
					}, procedure.providers);
					console.log("procedure: " + procedure);
					res.locals.speciality.push(procedure.speciality.name);
				}, procedureRes);
			});
			next();
		});
	});
	view.render('doctor');
};
