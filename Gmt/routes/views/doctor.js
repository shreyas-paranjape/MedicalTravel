var keystone = require('keystone');
var async = require('async');
var Enquiry = keystone.list('Enquiry');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	res.locals.procedures = [];
	res.locals.providers = [];
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

	var doctorQuery = keystone.list('Doctor').model.findOne({
		key: req.params.key
	});
	view.on('init', function(next) {
		doctorQuery.exec(function(err, doctorRes) {
			res.locals.doctor = doctorRes;
			doctorRes.getProcedures(function(er, procedureRes) {
				async.each(procedureRes, function(procedure, next) {
					if (!contains(procedure, res.locals.procedures)) {
						res.locals.procedures.push(procedure);
					}
					async.each(procedure.providers, function(provider, next) {
						if (!contains(provider, res.locals.providers)) {
							res.locals.providers.push(provider);
						}
					}, function(err) {
						next(err);
					});
				}, function(err) {
					next(err);
				});
				async.each(procedureRes, function(sp, next) {
					if (!contains(sp.speciality, res.locals.speciality)) {
						res.locals.speciality.push(sp.speciality);
					}
				}, function(err) {
					next(err);
				});
			});
			next();
		});
	});

	// Enquiry form Data submission
	view.on('post', {
		action: 'enquire'
	}, function(next) {
		var newQuery = new Enquiry.model(),
			updater = newQuery.getUpdateHandler(req);
		keystone.list('Doctor').model.findOne({
			key: req.params.key
		}).exec(function(err, result) {
			req.body.doctors = result.name;
			req.body.flag = "Consultation";
			updater.process(req.body, {
				flashErrors: false,
				fields: 'name, email, phone, procedure, doctor, flag, message',
				errorMessage: 'Cannot load'
			}, function(err) {
				if (err) {
					locals.validationErrors = err.errors;
					console.log(err.errors);
				} else {
					locals.consultationSent = true;
				}
				next();
			});
		});
	});
	view.render('doctor');
};
