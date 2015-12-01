var keystone = require('keystone');
var fnjs = require('fn.js');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'home';

	res.locals.doctors = [];

	var procQuery = keystone.list('Doctor').model.find();

	view.on('get', function(next) {
		procQuery.exec(function(err, docRes) {
			fnjs.each(function(doc) {
				res.locals.doctors.push(doc);
			}, docRes);
		});
		next();
	});

	view.on('post', {
		action: 'search1'
	}, function(next) {
		keystone.list('Procedure').model.find({
			key: req.body.procedure
		}).populate('doctors').exec(function(err, procedureRes) {
			fnjs.each(function(doc) {
				fnjs.each(function(doctor) {
					res.locals.doctors.push(doctor);
				}, doc.doctors);
			}, procedureRes);
		});
		next();
	});

	view.on('post', {
		action: 'search2'
	}, function(next) {
		keystone.list('Speciality').model.find({
			key: req.body.speciality
		}).exec(function(err, sepcialityRes) {
			sepcialityRes[0].getDoctorsAndProviders(function(doctors, providers) {
				fnjs.each(function(doc) {
					res.locals.doctors.push(doc);
					console.log("Doctors: " + locals.doctors);

				}, doctors);
			});
		});
		next();
	});

	view.on('post', {
		action: 'search3'
	}, function(next) {
		keystone.list('Provider').model.find({
			key: req.body.provider
		}).populate('doctors').exec(function(err, providerRes) {
			fnjs.each(function(doc) {
				fnjs.each(function(doctor) {
					res.locals.doctors.push(doctor);
				}, doc.doctors);
			}, providerRes);
		});
		next();
	});

	view.render('meetTheDoctor');
};
