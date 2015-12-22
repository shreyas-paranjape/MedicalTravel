var keystone = require('keystone');
var fnjs = require('fn.js');
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
	// view.query("doctor",doctorQuery);

	view.on('init', function(next) {
		doctorQuery.exec(function(err, doctorRes) {
			res.locals.doctor = doctorRes;
			//console.log("res.locals.doctor" + res.locals.doctor);
			doctorRes.getProcedures(function(er, procedureRes) {
				fnjs.each(function(procedure) {
					if (!contains(procedure, res.locals.procedures)) {
						res.locals.procedures.push(procedure);
					}
					fnjs.each(function(provider) {
						if (!contains(provider, res.locals.providers)) {
							res.locals.providers.push(provider);
						}
					}, procedure.providers);
				}, procedureRes);
				fnjs.each(function(sp) {
					if (!contains(sp.speciality, res.locals.speciality)) {
						res.locals.speciality.push(sp.speciality);
					}
				}, procedureRes);
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
