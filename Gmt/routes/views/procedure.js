var keystone = require('keystone');
var fnjs = require('fn.js');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	var SpecialityQuery = keystone.list('Speciality').model.find();

	res.locals.doctors = [];
	res.locals.providers = [];
	res.locals.procedures = [];
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

	view.on('init', function(next) {
		SpecialityQuery.exec(function(err, specialityRes) {
			res.locals.specialities = fnjs.map(function(speciality) {
				if (speciality.key == req.params.key) {
					speciality.active = true;
				}
				console.log("1");
				return speciality;
			}, specialityRes);
			res.locals.specialities = specialityRes;
			var Speciality = fnjs.filter(function(speciality) {
				return speciality.key == req.params.key;
				console.log("2");
			}, specialityRes);
			fnjs.each(function(speciality) {
				res.locals.speciality.push(speciality.discription);
				console.log("3");
			}, Speciality);
			Speciality[0].getDoctorsAndProviders(function(doctors, providers, procedures) {
				fnjs.each(function(doctor) {
					console.log("4");
					res.locals.doctors.push(doctor);
				}, doctors);
				fnjs.each(function(provider) {
					console.log("5");
					res.locals.providers.push(provider);
				}, providers);
				fnjs.each(function(procedure) {
					console.log("6");
					keystone.list('Price').model.find({
						procedure: procedure.id,
					}).sort('price').limit(1).exec(function(er, priceRes) {
						console.log("7");
						fnjs.each(function(price) {
							console.log("8");
							procedure.price = price.price;
						}, priceRes);
					});
					locals.procedures.push(procedure);
				}, procedures);
				next();
			});

		});
	});
	view.render('procedure');
};
