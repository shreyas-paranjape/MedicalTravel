var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'provider';
	// locals.provider_categories = [{
	// 	"name": "hospital"
	// }, {
	// 	"name": "Speciality clinics"
	// }, {
	// 	"name": "ayur.."
	// }];
	view.query('hospitals',keystone.list('Provider').model.find());
  view.query('providers',keystone.list('ProviderCategory').model.find());
/*	locals.providers = [{
		"name": "Manipal hospital"
	}, {
		"name": "wokhardt hospital"
	}];*/



	/*locals.data = [{
		"category": {
			"name": "hospital",
			"providers": [{
				"name": "Manipal hospital"
			}, {
				"name": "wokhardt hospital"
			}]
		}
	}, {
		"category": {
			"name": "Speciality clinics",
			"providers": [{
				"name": "Manipal hospital"
			}, {
				"name": "wokhardt hospital"
			}]
		}
	}, {
		"category": {
			"name": "Dentist and ayur center",
			"providers": [{
				"name": "Manipal hospital"
			}, {
				"name": "wokhardt hospital"
			}]
		}
	}];*/
	view.render('provider');
};
