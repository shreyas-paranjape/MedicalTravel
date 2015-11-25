var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'doc';
	// res.locals.doc = [];
	var doc = keystone.list('Doctor').model.find();
	view.on('init', function(next) {
		doc.exec(function(err, docRes) {
			res.locals.doctors = docRes;
			console.log(docRes);
		});
		next();
	});

  view.render('doc');
};
