var keystone = require('keystone');
var util = require('util');

var appAuth = require('box-appauth');
var fs = require('fs');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'profile';
	console.log("REQ Profile");
	console.log(util.inspect(req.user.id, false, null));

	keystone.list('User').model.findOne({
		_id: req.user.id,
	}).exec(function(err, resUser) {

		console.log("resUser:" + resUser);
		if (resUser.isUser == true) {
			view.render('profile');
		} else if (resUser.isDoctor == true) {
			view.render('profileDoctor');
		} else if (resUser.isProvider == true) {
			view.render('profileProvider');
		} else if (resUser.isAgent == true) {
			view.render('profileAgent');
		}
	});


	// Upload Code
	view.on('post', {
		action: 'upload'
	}, function(next) {

		keystone.list('User').model.findOne({
			"_id": req.user.id
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
					}).then(function(rest) {
						keystone.list('User').model.update({
							key: resUser.key
						}, {
							$set: {
								boxFile: {
									fileId: rest.entries[0].id,
									fileName: req.files.image_upload.originalname
								}
							}
						}, {

						}).exec(function(err, result1) {
							console.log("Result1: " + result1);
						});
					});
				});
		});
		next();
	});
};
