var keystone = require('keystone');
var appAuth = require('box-appauth');
var fs = require('fs');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'profile';
	view.on('post', {
		action: 'u'
	}, function(next) {

		keystone.list('User').model.findOne({
			"key": "alan-harper"
		}).exec(function(err, resUser) {

			appAuth({
					publicKey: fs.readFileSync('public_key.pem'),
					privateKey: fs.readFileSync('private_key.pem'),
					algorithm: 'RS256',
					issuer: "4eke4puqkw4chyh17err4skmk3rjuq4w",
					subject: resUser.boxId,
					subjectType: 'user',
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
					api.file.upload({
						name: req.files.image_upload.originalname,
						file: req.files.image_upload.path,
						parentId: "0",
						fields: [
							'total_count'
						]
					}).then(function(rest) {});
				});
		});
		next();
	});
	view.render('profile');
};
