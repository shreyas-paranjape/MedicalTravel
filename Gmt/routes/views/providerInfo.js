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

	//Display the Current provider with Procedures and Doctor
	view.query("provider", keystone.list('Provider').model.findOne({
		key: req.params.key
	}).populate('doctors'));

	var contains = function(aValue, aArray) {
		var idx;
		for (idx = 0; idx < aArray.length; idx++) {
			if (aValue._id.equals(aArray[idx]._id)) {
				return true;
			}
		}
		return false;
	}
	var ProvQuery = keystone.list('Provider').model.findOne({
		key: req.params.key
	}).populate('doctors');
	view.on('init', function(next) {
		ProvQuery.exec(function(err, provRes) {
			provRes.getSpecialites(function(e, procedureRes) {
				fnjs.each(function(procedure) {
					if (!contains(procedure, res.locals.procedures)) {
						locals.procedures.push(procedure);
					}
					if (!contains(procedure.speciality, res.locals.specialities)) {
						locals.specialities.push(procedure.speciality);
					}
				}, procedureRes);
			});
		});
		next();
	});

	// Enquiry form Data submission
	view.on('post', {
		action: 'enquire'
	}, function(next) {
		console.log(req.body);

		var newQuery = new Enquiry.model(),
			updater = newQuery.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: false,
			fields: 'name, email, phone, procedures, doctors, message',
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

	view.render('providerInfo');
};
