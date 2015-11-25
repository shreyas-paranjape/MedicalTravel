var keystone = require('keystone');
var fnjs = require('fn.js');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);

	var SpecialityQuery = keystone.list('Speciality').model.find();

	res.locals.doctors = [];
	res.locals.providers = [];
	res.locals.procedures = [];
	res.locals.section = req.params.key;

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
			res.locals.specialities = fnjs.map(function(spec){
				if(spec.key === req.params.key){
					spec.active = true;
				}
				return spec;
			},specialityRes);

			 var speciality = fnjs.filter(function(speciality) {
			 	return speciality.key == req.params.key;
			 }, specialityRes);

			speciality[0].getProcedures(function(e, proceduresRes) {
				fnjs.each(function(procedure) {
					res.locals.procedures.push(procedure);


					fnjs.each(function(provider) {
						if (!contains(provider, res.locals.providers)) {
							res.locals.providers.push(provider);
						}
					}, procedure.providers);

					fnjs.each(function(doctor) {
						if (!contains(doctor, res.locals.doctors)) {
							res.locals.doctors.push(doctor);

						}
					}, procedure.doctors);

				}, proceduresRes);
			});
			next();
		});
	});
	view.render('procedure');
};
