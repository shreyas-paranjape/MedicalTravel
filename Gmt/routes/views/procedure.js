var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	res.locals.doctors = [];
	res.locals.providers = [];
	res.locals.procedures = [];
	res.locals.specialityd = [];
	res.locals.specialityn = [];
	res.locals.specialities = [];

	//Manin query
	var SpecialityQuery = keystone.list('Speciality').model.find();
	view.on('init', function(next) {
		SpecialityQuery.exec(function(err_s, specialityRes) {
			if (err_s || !specialityRes.length) {
				return next(err_s);
			}

			//mapping with key for side menu
			async.map(specialityRes, function(speciality) {
				res.locals.specialities.push(speciality);
				if (speciality.key == req.params.key) {
					speciality.active = true;
					res.locals.specialityd.push(speciality.discription);
					res.locals.specialityn.push(speciality.name);
				}
				return speciality;
			}, function(err) {
				next(err);
			});

			//filtering the specialities from the key
			async.filter(specialityRes, function(speciality, callback) {
				if (speciality.key == req.params.key) {
					callback(true);
				} else {
					callback(false);
				}
			}, function(speciality) {

				// getiing all Doctors, Providers and procedure for the speciality
				speciality[0].getDoctorsAndProviders(function(doctors, providers, procedures) {
					async.each(doctors, function(doctor, next) {
						res.locals.doctors.push(doctor);
					}, function(err) {});
					async.each(providers, function(provider, next) {
						res.locals.providers.push(provider);
					}, function(err) {});
					async.each(procedures, function(procedure, next) {
						keystone.list('Price').model.find({
							procedure: procedure.id,
						}).sort('price').limit(1).exec(function(er, priceRes) {
							async.each(priceRes, function(price, next) {
								procedure.price = price.price;
							}, function(err) {});
						});
						res.locals.procedures.push(procedure);
					}, function(err) {});
				});
			});
			next();
		});
	});
	view.render('procedure');
};
