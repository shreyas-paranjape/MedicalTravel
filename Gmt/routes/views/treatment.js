var keystone = require('keystone');
var fnjs = require('fn.js');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);

	var TreatCatQuery = keystone.list('TreatmentCategory').model.find();

	res.locals.doctors = [];
	res.locals.providers = [];
	res.locals.treatments = [];

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
		TreatCatQuery.exec(function(err, treatCatsRes) {
			res.locals.treatmentCategories = treatCatsRes;

			var treatCat = fnjs.filter(function(treatCat) {
				return treatCat.key == req.params.key;
			}, treatCatsRes);

			res.locals.treatmentCategory = treatCat;

			treatCat[0].getTreatments(function(e, treatmentsRes) {
				fnjs.each(function(treatment) {
					res.locals.treatments.push(treatment);

					fnjs.each(function(provider) {
						if (!contains(provider, res.locals.providers)) {
							res.locals.providers.push(provider);
						}
					}, treatment.providers);

					fnjs.each(function(doctor) {
						if (!contains(doctor, res.locals.doctors)) {
							res.locals.doctors.push(doctor);
						}
					}, treatment.doctors);

				}, treatmentsRes);
			});
			next();
		});
	});
	view.render('treatment');
};
