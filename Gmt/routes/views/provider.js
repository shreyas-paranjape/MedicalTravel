var keystone = require('keystone');
var async = require('async');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.validationErrors = {};
	locals.enquirySent = false;
	locals.section = 'provider';

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
	}).populate('doctors').populate('reviews'));

	var ProvQuery = keystone.list('Provider').model.findOne({
		key: req.params.key
	}).populate('doctors');

	view.on('init', function(next) {
		ProvQuery.exec(function(err, currentProvider) {
			keystone.list('Speciality').model.find().exec(function(err_s, specialities) {
				if (err_s || !specialities.length) {
					return next(err_s);
				}
				async.each(specialities, function(spec, next) {
					spec.procedures = [];
					spec.getProcedures(function(err_p, procedures) {
						if (err_p || !procedures.length) {
							return next(err_p);
						}
						async.each(procedures, function(proced, next) {
							if (contains(currentProvider, proced.providers)) {
								proced.getPrice(function(err_pc, p) {
									if (err_pc) {
										return next(err_pc);
									}
									if (undefined != p[0]) {
										proced.price = p[0].price;
									}
									spec.procedures.push(proced);
									if (!contains(spec, res.locals.specialities)) {
										res.locals.specialities.push(spec);
									}
									next(err_pc);
								});
							} else {
								next();
							}
						}, function(err) {
							next(err);
						});
					});
				}, function(err) {
					next(err);
				});
			});
		});
		//console.log("calling next");
		//
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
