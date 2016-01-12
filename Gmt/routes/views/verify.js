var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'verify';

	var profileQuery = keystone.list('User').model.findOne({
		"uuid": req.params.key,
	});
	view.on('init', function(next) {
		profileQuery.exec(function(err, resUser) {
			keystone.list('User').model.update({
				uuid: req.params.key,
			}, {
				$set: {
					verify: "Yes",
				}
			}).exec(function(err, result1) {});
			console.log("Verfied");
		});
		next();
	});
	view.render('verify');
}
