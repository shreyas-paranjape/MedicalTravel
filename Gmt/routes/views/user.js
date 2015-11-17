var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'user';


	locals.doctors = [];
	locals.provider = {};
	locals.providers = {}

	var treatmentQuery = keystone
		.list('Treatment').model.findOne()
		.populate('doctors');
	view.on('init', function(next) {
		treatmentQuery.exec(function(err, tr) {
			locals.treatments = tr;
			var counter;
			for (counter = 0; counter < tr.doctors.length; counter++) {
				locals.doctors.push(tr.doctors[counter]);
			}
			next();
		});
	});

	var providerQuery = keystone
		.list('Provider').model.findOne()
		// .populate('providers')
		// .populate('doctors');
	view.on('init', function(next) {
		providerQuery.exec(function(err, pr) {
			locals.provider = pr;
			locals.providers = pr;
			next();
		});
	});


	// locals.treatment_doctors=[{
	// 	"name":" Dr. Arjun Mehta"
	// },{
	// 	"desc":"MBBS, KLE."
	// },{
	// 	"speciality":"Cardiologist, Edinburgh, Scotland"
	// }];
	locals.doctor_nav = [{
		"name": "About"
	}, {
		"name": "Doctors"
	}, {
		"name": "procedures"
	}, {
		"name": "Reviews"
	}];
	locals.doctor_pro = [{
		"name": "Bones & Joints"
	}, {
		"name": "Dentistry"
	}, {
		"name": "Eye Care"
	}, {
		"name": "Cosmetics"
	}, {
		"name": "Bariatrics"
	}, {
		"name": "Ayurveda"
	}];

	view.render('user');
};
