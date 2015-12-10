var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'login';
	locals.validationErrors = {};
	locals.notLoggedInSuccessfully = false;

	view.on('post', {
		action: 'login'
	}, function(next) {

		keystone.list('User').model.findOne({
			email: req.body.email
		}).exec(function(err, user) {
			if (user) {
				user._.password.compare(req.body.password, function(err, isMatch) {
					if (!err && isMatch) {
						res.redirect('/profile');

					} else {
						res.redirect('/login');
						locals.notLoggedInSuccessfully = true;
					}
				});
			} else {
				res.redirect('/login');
				locals.notLoggedInSuccessfully = true;
			}
		});
	});
	view.render('login');
}
