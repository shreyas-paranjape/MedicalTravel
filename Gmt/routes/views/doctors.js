var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

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

	//All Specialities list
	var specialityQuery = keystone.list('Speciality').model.find().sort('imageOuter');
	view.on('init', function(next) {
		specialityQuery.exec(function(err, specialities) {
			async.each(specialities, function(spec, cb1) {
				spec.procedures = [];
				spec.getProcedures(function(err, procedures) {
					async.each(procedures, function(proced, cb2) {
						spec.procedures.push(proced);
						if (!contains(spec, res.locals.speciality)) {
							res.locals.speciality.push(spec);
						}
						cb2(err);
					}, function(err) {
						cb1(err);
					});
				});
			}, function(err) {
				next(err);
			});
		});
	});

	//Text box Search
	view.on('post', {
		action: 'testSearch'
	}, function(next) {
		console.log("TEXT" + JSON.stringify(req.body.procedureId));
		keystone.list('Procedure').model.find({
			name: req.body.procedure
		}).populate('doctors').exec(function(err, procedureRes) {
			async.each(procedureRes, function(procedure, cb1) {
				async.each(procedure.doctors, function(doctor, cb2) {
					res.locals.doctors.push(doctor);
					cb2(err);
				}, function(err) {
					cb1(err);
				});
			}, function(err) {
				next(err);
			});
		});
	});

	//Radio Button Search
	view.on('post', {
		action: 'radioSearch'
	}, function(next) {
		console.log("req" + JSON.stringify(req.body.procedure));
		keystone.list('Procedure').model.find({
			key: req.body.procedure
		}).populate('doctors').exec(function(err, procedureRes) {
			async.each(procedureRes, function(procedure, cb1) {
				async.each(procedure.doctors, function(doctor, cb2) {
					res.locals.doctors.push(doctor);
					cb2(err);
				}, function(err) {
					cb1(err);
				});
			}, function(err) {
				next(err);
			});
		});
	});

	view.render('doctors');
};
