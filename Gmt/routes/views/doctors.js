var keystone = require('keystone');
var fnjs = require('fn.js');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'home';

	res.locals.doctors = [];
	res.locals.speciality = [];

	var procQuery = keystone.list('Doctor').model.find().sort("-imageOuter");
	view.on('get', function(next) {
		procQuery.exec(function(err, docRes) {
			fnjs.each(function(doc) {
				res.locals.doctors.push(doc);
			}, docRes);
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
			fnjs.each(function(spec) {
				spec.procedures = [];
				spec.getProcedures(function(err, procedures) {
					fnjs.each(function(proced) {
						spec.procedures.push(proced);
						if (!contains(spec, res.locals.speciality)) {
							res.locals.speciality.push(spec);
						}
					}, procedures);
				});
			}, specialities);
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
			fnjs.each(function(procedure) {
				fnjs.each(function(doctor) {
					res.locals.doctors.push(doctor);
				}, procedure.doctors);
			}, procedureRes);
		});
		next();
	});

	view.render('doctors');
};
