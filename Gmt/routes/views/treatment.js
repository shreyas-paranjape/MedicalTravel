var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'treatment';
	locals.treatment_categories=[{
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

	locals.treatment_nav=[{
		"name":"About"
	},{
		"name":"Providers"
	},{
		"name":"Doctors"
	},{
		"name":"procedures"
  }];

		locals.treatment_providers=[{
			"name":"Manipal hospital,goa"
		},{
			"name":"wokhardt hospital,goa"
		}];

		locals.treatment_doctors=[{
			"name":" Dr. Arjun Mehta"
		},{
			"desc":"MBBS, KLE."
		},{
			"speciality":"Cardiologist, Edinburgh, Scotland"
		}];
	// locals.treatment = {
	// 	"name": "I am a treatment."
	// };
	view.render('treatment');
};
