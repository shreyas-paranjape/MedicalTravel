var keystone = require('keystone');
var User = keystone.list('User');
var appAuth = require('box-appauth');
var fs = require('fs');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var key, idx;
	locals.section = 'signup';
	locals.validationErrors = {};
	locals.signedUpSuccessfully = false;

	view.on('post', {
		action: 'signup'
	}, function(next) {
		console.log(req.body);

		var newUser = new User.model(),
			updater = newUser.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: false,
			fields: 'name, email, password',
			errorMessage: 'Cannot Login:'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
				console.log(err.errors);
			} else {
				locals.signedUpSuccessfully = true;

				appAuth({
						publicKey: fs.readFileSync('public_key.pem'),
						privateKey: fs.readFileSync('private_key.pem'),
						algorithm: 'RS256',
						issuer: "4eke4puqkw4chyh17err4skmk3rjuq4w",
						subject: "772825",
						subjectType: 'enterprise',
						clientId: "4eke4puqkw4chyh17err4skmk3rjuq4w",
						clientSecret: "xYSZp93vWNo0eqqwgBL83ZpD15YtHvsA",
						publicKeyId: "42oxjqmg",
						callRetryMax: 5,
						minutesUntilTokenRefresh: 10,
						options: {
							debug: true
						}
					})
					.then(function(api) {
						var userQuery = keystone.list('User').model.findOne({
							email: req.body.email
						}).exec(function(err, result) {
							console.log(result);

							api.user.create({
								name: result.key
							}).then(function(resUser) {
								idx = resUser.id;

								var idxQuery = keystone.list('User').model.update({
									key: result.key
								}, {
									$set: {
										boxId: resUser.id,
									}
								}).exec(function(err, result1) {
									console.log("Result1: " + result1);
								});
							});
						});
					});
			}
			next();
		});

	});
	view.render('signup');
};
