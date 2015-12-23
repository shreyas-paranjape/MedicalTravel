var keystone = require('keystone');
var async = require('async');
var fnjs = require('fn.js');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var Speciality;
	var SpecialityQuery = keystone.list('Speciality').model.find();

	res.locals.doctors = [];
	res.locals.providers = [];
	res.locals.procedures = [];
	res.locals.speciality = [];
	res.locals.specialities = [];

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
		SpecialityQuery.exec(function(err_s, specialityRes) {
			if (err_s || !specialityRes.length) {
				return next(err_s);
			}
			async.map(specialityRes, function(speciality) {
				res.locals.specialities.push(speciality);
				if (speciality.key == req.params.key) {
					speciality.active = true;
					res.locals.speciality.push(speciality.discription);
				}
				return speciality;
			}, function(err) {
				next(err);
			});

			var Speciality = fnjs.filter(function(speciality) {
				return speciality.key == req.params.key;
			}, specialityRes);
			//
			// async.filter(specialityRes, function(speciality, callback) {
			// 	if (speciality.key == req.params.key) {
			// 		callback(true);
			// 	}
			// }, function(results) {
			// 	Speciality = results;
			// 	console.log("Speciality:" + results);
			// });

			Speciality[0].getDoctorsAndProviders(function(doctors, providers, procedures) {
				async.each(doctors, function(doctor, next) {
					res.locals.doctors.push(doctor);
				}, function(err) {
					next(err);
				});
				async.each(providers, function(provider, next) {
					res.locals.providers.push(provider);
				}, function(err) {
					next(err);
				});
				async.each(procedures, function(procedure, next) {
					keystone.list('Price').model.find({
						procedure: procedure.id,
					}).sort('price').limit(1).exec(function(er, priceRes) {
						fnjs.each(function(price) {
							procedure.price = price.price;
						}, priceRes);
					});
					res.locals.procedures.push(procedure);
				}, function(err) {
					next(err);
				});
			});
			next();
		});
	});
	view.render('procedure');
};
