var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'doctor';


locals.doctors = {};
locals.provider={};
locals.education={}

var doctorQuery=keystone
.list('Doctor').model.findOne()
view.on('init',function(next){
	doctorQuery.exec(function(err,dr){
		locals.doctors=dr;
		locals.education=dr;
		next();
	});
});


	var providerQuery = keystone
		.list('Provider').model.findOne()
	  view.on('init', function(next) {
		providerQuery.exec(function(err, pr) {
			locals.provider = pr;


			next();
		});
	});
  view.query('treatments',keystone.list('Treatment').model.find());



	// locals.treatment_doctors=[{
	// 	"name":" Dr. Arjun Mehta"
	// },{
	// 	"desc":"MBBS, KLE."
	// },{
	// 	"speciality":"Cardiologist, Edinburgh, Scotland"
	// }];
	locals.doctor_nav=[{
		"name":"Bio"
	},{
		"name":"Education"
	},{
		"name":"Awards"
	},{
		"name":"Reviews"
  }];


	view.render('doctor');
};
