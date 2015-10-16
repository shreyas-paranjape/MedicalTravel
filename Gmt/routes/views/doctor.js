var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'doctor';
	locals.treatment_doctors=[{
		"name":" Dr. Arjun Mehta"
	},{
		"desc":"MBBS, KLE."
	},{
		"speciality":"Cardiologist, Edinburgh, Scotland"
	}];
	locals.doctor_nav=[{
		"name":"About"
	},{
		"name":"Doctors"
	},{
		"name":"procedures"
	},{
		"name":"Reviews"
  }];
	locals.doctor_pro=[{
		"name":"Bones & Joints"
	},{
		"name":"Dentistry"
	},{
		"name":"Eye Care"
	},{
		"name":"Cosmetics"
	},{
		"name":"Bariatrics"
	},{
		"name":"Ayurveda"
	}];
	
	view.render('doctor');
};
