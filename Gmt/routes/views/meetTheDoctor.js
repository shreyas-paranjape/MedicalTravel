var keystone = require('keystone');
var fnjs = require('fn.js');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'home';

	res.locals.doctors = {};

	var procQuery = keystone.list('Doctor').model.find();

	view.on('init', function(next) {
		procQuery.exec(function(err, docRes) {
			console.log("Doctors: "+docRes);
		});
		next();
	});

	view.on('post', {
		action: 'search1'
	}, function(next) {

		keystone.list('Procedure').model.find({
			key: req.body.procedure
		}).populate('doctors').exec(function(err, procedureRes) {
			console.log("Doctors: " + procedureRes[0].doctors);
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
				fnjs.each(function(doctor) {
					console.log("Doctors: " + doctor);
				}, doctors);
			});
		});
		next();
	});

	view.on('post', {
		action: 'search3'
	}, function(next) {
		console.log("req.body.provider :" + req.body.provider);
		keystone.list('Provider').model.find({
			key: req.body.provider
		}).populate('doctors').exec(function(err, providerRes) {
			console.log("Doctors: " + providerRes[0].doctors);
		});
		next();
	});

	view.render('meetTheDoctor');
};
