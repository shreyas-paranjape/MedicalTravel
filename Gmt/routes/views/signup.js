var keystone = require('keystone');
var User = keystone.list('User');
var appAuth = require('box-appauth');
var fs = require('fs');
var uuid = require('uuid');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var key, idx;
	locals.validationErrors = {};
	locals.signedUpSuccessfully = false;

	view.on('post', {
		action: 'signup'
	}, function(next) {

		var newUser = new User.model(),
			updater = newUser.getUpdateHandler(req);
		req.body.lastLogin = Date.now;
		req.body.uuid = uuid.v1();
		req.body.verify = "No"
		updater.process(req.body, {

			flashErrors: false,
			fields: 'name, email, password, lastLogin, uuid, verify',
			errorMessage: 'Cannot Login:'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.signedUpSuccessfully = true;

				appAuth({
						publicKey: fs.readFileSync('public_key.pem'),
						privateKey: fs.readFileSync('private_key.pem'),
						algorithm: 'RS256',
						issuer: "q3bx2diw8xuzyurn0ztd31yuqeqjsedg",
						subject: "826941",
						subjectType: 'enterprise',
						clientId: "q3bx2diw8xuzyurn0ztd31yuqeqjsedg",
						clientSecret: "hUTWsjEIoYRZq0ilKrykoN0tTlT1jE8h",
						publicKeyId: "oeirzs4v",
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

							api.user.create({
								name: result.key
							}).then(function(resUser) {
								console.log("resUser" + JSON.stringify(resUser));
								idx = resUser.id;

								keystone.list('User').model.update({
									key: result.key
								}, {
									$set: {
										boxId: resUser.id,
									}
								}).exec(function(err, result1) {});
							});
						});
					});
			}
			next();
		});

	});
	view.render('signup');
};
