var keystone = require('keystone');
var fnjs = require('fn.js');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);

	var SpecialityQuery = keystone.list('Speciality').model.find();

	res.locals.doctors = [];
	res.locals.providers = [];
	res.locals.procedures = [];

	var contains = function(aValue, aArray) {
		var idx;
		for (idx = 0; idx < aArray.length; idx++) {
			if (aValue._id.equals(aArray[idx]._id)) {
				return true;
			}
		}
		return false;
	}

	view.on('init', function(next) {
		SpecialityQuery.exec(function(err, specialityRes) {
			res.locals.specialities = specialityRes;

			var Speciality = fnjs.filter(function(speciality) {
				return speciality.key == req.params.key;
			}, specialityRes);

			Speciality[0].getDoctorsAndProviders(function(doctors, providers) {
				fnjs.each(function(doctor) {
					res.locals.doctors.push(doctor);
				}, doctors);
				fnjs.each(function(provider) {
					res.locals.providers.push(provider);
				}, providers);
			});

			Speciality[0].getProcedures(function(e, proceduresRes) {
				fnjs.each(function(procedure) {
					res.locals.procedures.push(procedure);
				}, proceduresRes);
			});
			next();
		});
	});
	view.render('procedure');
};
