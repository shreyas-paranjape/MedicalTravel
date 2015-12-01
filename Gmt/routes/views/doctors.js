var keystone = require('keystone');
var fnjs = require('fn.js');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'home';

	res.locals.doctors = [];

	var procQuery = keystone.list('Doctor').model.find();

	var procedureSearch = function(q) {
		keystone.list('Procedure').model.find({
			_id: q
		}).populate('doctors').exec(function(err, procedureRes) {
			fnjs.each(function(procedure) {
				fnjs.each(function(doctor) {
					res.locals.doctors.push(doctor);
				}, procedure.doctors);
			}, procedureRes);
		});
	};

	var specialitySearch = function(q) {
		keystone.list('Speciality').model.find({
			_id: q
		}).exec(function(err, sepcialityRes) {
			sepcialityRes[0].getDoctorsAndProviders(function(doctors, providers) {
				fnjs.each(function(doc) {
					res.locals.doctors.push(doc);
				}, doctors);
			});
		});
	};

	var providerSearch = function(q) {
		keystone.list('Provider').model.find({
			_id: q
		}).populate('doctors').exec(function(err, providerRes) {
			fnjs.each(function(doc) {
				fnjs.each(function(doctor) {
					res.locals.doctors.push(doctor);
				}, doc.doctors);
			}, providerRes);
		});
	};

	var doctorSearch = function(q) {
		keystone.list('Doctor').model.findOne({
			_id: q
		}).exec(function(err, doctor) {
			res.locals.doctors.push(doctor);
		});
	};

	view.on('get', function(next) {
		procQuery.exec(function(err, docRes) {
			fnjs.each(function(doc) {
				res.locals.doctors.push(doc);
			}, docRes);
		});
		next();
	});

	view.on('post', {
		action: 'search'
	}, function(next) {
		var args = req.body.globalId.split(":");
		if ("Procedure" == args[0]) {
			procedureSearch(args[1]);
		} else if ("Speciality" == args[0]) {
			specialitySearch(args[1]);
		} else if ("Provider" == args[0]) {
			providerSearch(args[1]);
		} else if ("Doctor" == args[0]) {
			doctorSearch(args[1]);
		}
		next();
	});


	view.render('doctors');
};
