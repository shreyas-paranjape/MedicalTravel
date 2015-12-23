var keystone = require('keystone');
var async = require('async');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'home';

	res.locals.doctors = [];
	res.locals.speciality = [];

	var procQuery = keystone.list('Doctor').model.find().sort("-imageOuter");
	view.on('get', function(next) {
		procQuery.exec(function(err, docRes) {
			async.each(docRes, function(doc, next) {
				res.locals.doctors.push(doc);
			}, function(err) {
				next(err);
			});
		});
		next();
	});

	var contains = function(aValue, aArray) {
		var idx;
		for (idx = 0; idx < aArray.length; idx++) {
			if (aValue._id.equals(aArray[idx]._id)) {
				return true;
			}
		}
		return false;
	}

	var specialityQuery = keystone.list('Speciality').model.find();
	view.on('init', function(next) {
		specialityQuery.exec(function(err, specialities) {
			async.each(specialities, function(spec, next) {
				spec.procedures = [];
				spec.getProcedures(function(err, procedures) {
					async.each(procedures, function(proced, next) {
						spec.procedures.push(proced);
						if (!contains(spec, res.locals.speciality)) {
							res.locals.speciality.push(spec);
						}
					}, function(err) {
						next(err);
					});
				});
			}, function(err) {
				next(err);
			});
		});
		next();
	});

	view.on('post', {
		action: 'search'
	}, function(next) {
		console.log("req" + req.body.procedure);
		keystone.list('Procedure').model.find({
			name: req.body.procedure
		}).populate('doctors').exec(function(err, procedureRes) {
			async.each(procedureRes, function(procedure, next) {
				async.each(procedure.doctors, function(doctor, next) {
					res.locals.doctors.push(doctor);
				}, function(err) {
					next(err);
				});
			}, function(err) {
				next(err);
			});
		});
		next();
	});

	view.render('doctors');
};
