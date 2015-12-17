var keystone = require('keystone');
var fnjs = require('fn.js');
var Enquiry = keystone.list('Enquiry');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.validationErrors = {};
	locals.enquirySent = false;
	locals.section = 'providerInfo';


	res.locals.doctors = [];
	res.locals.procedures = [];
	res.locals.specialities = [];
	res.locals.proceduresPrice = [];

	var contains = function(aValue, aArray) {
		var idx;
		for (idx = 0; idx < aArray.length; idx++) {
			if (aValue._id.equals(aArray[idx]._id)) {
				return true;
			}
		}
		return false;
	}

	//Display the Current provider with Doctor and Procedure with doctor
	view.query("provider", keystone.list('Provider').model.findOne({
		key: req.params.key
	}).populate('doctors'));

	var ProvQuery = keystone.list('Provider').model.findOne({
		key: req.params.key
	}).populate('doctors');

	view.on('init', function(next) {
		ProvQuery.exec(function(err, currentProvider) {
			keystone.list('Speciality').model.find().exec(function(err, specialities) {
				fnjs.each(function(spec) {
					spec.procedures = [];
					spec.getProcedures(function(err, procedures) {
						fnjs.each(function(proced) {
							if (contains(currentProvider, proced.providers)) {
								proced.getPrice(function(err, p) {
									if (undefined != p[0]) {
										proced.price = p[0].price;
									}
									spec.procedures.push(proced);
									if (!contains(spec, res.locals.specialities)) {
										res.locals.specialities.push(spec);
									}
								});
							}
						}, procedures);
					});
				}, specialities);
				next();
			});
		});
	});

	// Enquiry form Data submission
	view.on('post', {
		action: 'enquire'
	}, function(next) {
		var newQuery = new Enquiry.model(),
			updater = newQuery.getUpdateHandler(req);
		keystone.list('Provider').model.findOne({
			key: req.params.key
		}).exec(function(err, result) {
			req.body.provider = result.name;
			req.body.flag = "Enquiry";
			updater.process(req.body, {
				flashErrors: false,
				fields: 'name, email, phone, provider, procedure, doctor, flag, message',
				errorMessage: 'Cannot load'
			}, function(err) {
				if (err) {
					locals.validationErrors = err.errors;
					console.log(err.errors);
				} else {
					locals.enquirySent = true;
				}
				next();
			});
		});
	});
	view.render('provider');
};
