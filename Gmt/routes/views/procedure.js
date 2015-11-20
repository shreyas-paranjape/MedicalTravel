var keystone = require('keystone');
var fnjs = require('fn.js');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);

	var SpecialQuery = keystone.list('Speciality').model.find();

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
		SpecialQuery.exec(function(err, specialitiesRes) {
			res.locals.specialities = specialitiesRes;
			console.log("specialitiesRes: "+specialitiesRes);

			var special = fnjs.filter(function(special) {
				return special.key == req.params.key;
			}, specialitiesRes);
    console.log("special: "+special);
			res.locals.speciality = special;

			special[0].getProcedures(function(e, proceduresRes) {
				fnjs.each(function(procedure) {
					res.locals.procedures.push(procedure);

					console.log("procedure: "+procedure);

					fnjs.each(function(provider) {
						if (!contains(provider, res.locals.providers)) {
							res.locals.providers.push(provider);
							console.log("provider: "+provider);
						}
					}, procedure.providers);

					fnjs.each(function(doctor) {
						if (!contains(doctor, res.locals.doctors)) {
							res.locals.doctors.push(doctor);
							console.log("procedure: "+doctor);

						}
					}, procedure.doctors);

				}, proceduresRes);
			});
			next();
		});
	});
	view.render('procedure');
};
