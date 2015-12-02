var keystone = require('keystone');
var fnjs = require('fn.js');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

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
			res.locals.specialities = fnjs.map(function(speciality){
				if(speciality.key == req.params.key){
					speciality.active = true;
				}
				return speciality;
			},specialityRes);

			var Speciality = fnjs.filter(function(speciality) {
				return speciality.key == req.params.key;
			}, specialityRes);

			Speciality[0].getDoctorsAndProviders(function(doctors, providers, procedures) {
				fnjs.each(function(doctor) {
					res.locals.doctors.push(doctor);
				}, doctors);
				fnjs.each(function(provider) {
					res.locals.providers.push(provider);
				}, providers);
				fnjs.each(function(procedure) {
					keystone.list('Price').model.find({
						procedure: procedure.id,
					}).sort('price').limit(1).exec(function(er, priceRes) {
						fnjs.each(function(price) {
							procedure.price = price.price;
							locals.procedures.push(procedure);
						}, priceRes)
					})
				}, procedures);
			});
			next();
		});
	});
	view.render('procedure');
};
