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

	//Display the Current provider with Procedures and Doctor
	view.query("provider", keystone.list('Provider').model.findOne({
		key: req.params.key
	}).populate('doctors'));

	var ProvQuery = keystone.list('Provider').model.findOne({
		key: req.params.key
	}).populate('doctors');
	view.on('init', function(next) {
		ProvQuery.exec(function(err, currentProvider) {
			currentProvider.getProcedures(function(e, procedures) {
				fnjs.each(function(procedure) {
					if (!contains(procedure.speciality, res.locals.specialities)) {
						locals.specialities.push(procedure.speciality);
					}
					keystone.list('Price').model.find({
						procedure: procedure.id,
						provider: currentProvider.id
					}).exec(function(er, priceRes) {
						fnjs.each(function(price) {
							procedure.price = price.price;
							locals.procedures.push(procedure);
						}, priceRes)
					})
				}, procedures);

			});
		});
		next();
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
