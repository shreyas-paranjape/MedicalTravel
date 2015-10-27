var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'treatment';
	// locals.treatment_categories=[{
	// 	"name":"Bones & Joints"
	// },{
	// 	"name":"Dentistry"
	// },{
	// 	"name":"Eye Care"
	// },{
	// 	"name":"Cosmetics"
	// },{
	// 	"name":"Bariatrics"
	// },{
	// 	"name":"Ayurveda"
	// }];
	locals.treatment = {};
	locals.providers = [];
	locals.doctors = [];

	var treatmentQuery = keystone
		.list('Treatment').model.findOne()
		.populate('providers')
		.populate('doctors');

	view.on('init', function(next) {
		treatmentQuery.exec(function(err, tr) {
			locals.treatment = tr;
			var counter;
			for(counter=0;counter<tr.providers.length;counter++){
				locals.providers.push(tr.providers[counter]);
			}
			for(counter=0;counter<tr.doctors.length;counter++){
				locals.doctors.push(tr.doctors[counter]);
			}
			next();
		});
	});
	view.query('treat',keystone.list('Treatment').model.find());

 view.query('categories', keystone.list('TreatmentCategory').model.find());
	locals.treatment_nav = [{
		"name": "About"
	}, {
		"name": "Providers"
	}, {
		"name": "Doctors"
	}, {
		"name": "procedures"
	}];
	// locals.treatment_doctors=[{
	// 	"name":" Dr. Arjun Mehta,panjim,sgfs"
	// 	},{
	// 	"name":"dr afedg,dsgf,sgfd"
	// }];


	// locals.treatment_providers=[{
	// 	"name":"Manipal hospital,goa"
	// },{
	// 	"name":"wokhardt hospital,goa"
	// }];
	view.render('treatment');
};
