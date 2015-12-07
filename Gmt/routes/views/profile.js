var keystone = require('keystone');
var appAuth = require('box-appauth');
var fs = require('fs');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'profile';

	keystone.list('Enquiry').model.find({
		"state": "N",
	}).exec(function(err, resUser) {
		console.log("resUser:" + resUser);
	});
	// Upload Code
	view.on('post', {
		action: 'upload'
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
	view.render('profile');
};
