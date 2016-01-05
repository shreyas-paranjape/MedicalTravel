var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'verify';

	var profileQuery = keystone.list('User').model.findOne({
		"_id": req.user.id
	});
	view.on('init', function(next) {
		profileQuery.exec(function(err, resUser) {
			console.log("Verfied");
		});
		next();
	});
	view.render('verify');
}
