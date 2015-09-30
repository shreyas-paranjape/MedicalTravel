var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'service';
	
	// Load the galleries by sortOrder
	locals.facilities = {}

	//view.on('init', function(next) {
		//keystone.list('Facility').model.find().sort('sortOrder'));
	//}
	
	
	// Render the view
	view.render('service');
	
};
