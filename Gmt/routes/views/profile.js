var keystone = require('keystone');
var async = require('async');
var appAuth = require('box-appauth');
var fs = require('fs');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	res.locals.files = [];

	// initial nevigation
	keystone.list('User').model.findOne({
		_id: req.user.id,
	}).exec(function(err, resUser) {
		if (resUser.verify == "Yes") {
			view.render('profile');
		} else {
			view.render('login');

		}
		//  else if (resUser.isDoctor == true) {
		// 	view.render('profileDoctor');
		// } else if (resUser.isProvider == true) {
		// 	view.render('profileProvider');
		// } else if (resUser.isAgent == true) {
		// 	view.render('profileAgent');
		// }
	});


	//file display
	var profileQuery = keystone.list('User').model.findOne({
		"_id": req.user.id
	});
	view.on('init', function(next) {
		profileQuery.exec(function(err, resUser) {
			appAuth({
					publicKey: fs.readFileSync('public_key.pem'),
					privateKey: fs.readFileSync('private_key.pem'),
					algorithm: 'RS256',
					issuer: "q3bx2diw8xuzyurn0ztd31yuqeqjsedg",
					subject: resUser.boxId,
					subjectType: 'user',
					clientId: "q3bx2diw8xuzyurn0ztd31yuqeqjsedg",
					clientSecret: "hUTWsjEIoYRZq0ilKrykoN0tTlT1jE8h",
					publicKeyId: "hhqzcvgu",
					callRetryMax: 5,
					minutesUntilTokenRefresh: 10,
					options: {
						debug: true
					}
				})
				.then(function(api) {
					api.folder.list({
						id: 0,
					}).then(function(listRes) {
						if (!listRes.total_count) {
							console.log("No Files Present");
						} else {
							async.each(listRes.entries, function(folderRes, next) {
								if (folderRes.type == "folder") {
									api.folder.list({
										id: folderRes.id,
									}).then(function(inFolderRes) {
										async.each(inFolderRes.entries, function(inFolder, next) {
											console.log("Names in folder : " + JSON.stringify(inFolder.name));
										}, function(err) {});
									});
								}
								res.locals.files.push(folderRes);
								console.log("Names in Root : " + JSON.stringify(folderRes.name));
							}, function(err) {});
						}

					});
				});
		});
		next();
	});

	// file download
	// view.on('post', {
	// 	action: 'download'
	// }, function(next) {
	// 	console.log("Names in Root : " + JSON.stringify(req.body));
	// 	keystone.list('User').model.findOne({
	// 		"_id": req.user.id
	// 	}).exec(function(err, resUser) {
	// 		appAuth({
	// 				publicKey: fs.readFileSync('public_key.pem'),
	// 				privateKey: fs.readFileSync('private_key.pem'),
	// 				algorithm: 'RS256',
	// 				issuer: "q3bx2diw8xuzyurn0ztd31yuqeqjsedg",
	// 				subject: resUser.boxId,
	// 				subjectType: 'user',
	// 				clientId: "q3bx2diw8xuzyurn0ztd31yuqeqjsedg",
	// 				clientSecret: "hUTWsjEIoYRZq0ilKrykoN0tTlT1jE8h",
	// 				publicKeyId: "hhqzcvgu",
	// 				callRetryMax: 5,
	// 				minutesUntilTokenRefresh: 10,
	// 				options: {
	// 					debug: true
	// 				}
	// 			})
	// 			.then(function(api) {
	// 				api.folder.list({
	// 					id: 0,
	// 				}).then(function(fileId) {
	// 					//		console.log("fileId" + JSON.stringify(fileId.entries));
	// 					async.each(fileId.entries, function(file, cb1) {
	// 						console.log("fileIfileIdfileIdd:     " + JSON.stringify(file.id));
	// 						api.file.download({
	// 							id: file.id,
	// 						}).then(function(rest) {
	// 							console.log("fileId" + JSON.stringify(rest));
	// 						});
	// 						cb1(err);
	// 					}, function(err) {
	// 						next(err);
	// 					});
	//
	// 				});
	// 			});
	// 	});
	// });

	//UPLOAD
	view.on('post', {
		action: 'fileupload'
	}, function(next) {
		// console.log("length" + (req.files.image_upload).length);
		keystone.list('User').model.findOne({
			"_id": req.user.id
		}).exec(function(err, resUser) {
			appAuth({
					publicKey: fs.readFileSync('public_key.pem'),
					privateKey: fs.readFileSync('private_key.pem'),
					algorithm: 'RS256',
					issuer: "q3bx2diw8xuzyurn0ztd31yuqeqjsedg",
					subject: resUser.boxId,
					subjectType: 'user',
					clientId: "q3bx2diw8xuzyurn0ztd31yuqeqjsedg",
					clientSecret: "hUTWsjEIoYRZq0ilKrykoN0tTlT1jE8h",
					publicKeyId: "hhqzcvgu",
					callRetryMax: 5,
					minutesUntilTokenRefresh: 10,
					options: {
						debug: true
					}
				})
				.then(function(api) {

					if (req.files.fileupload.length > 0) {
						var count = 1;
						async.each(req.files.fileupload, function(file, cb1) {
							api.file.upload({
								name: count + "00" + file.originalname,
								file: file.path,
								parentId: "0",
								fields: [
									'total_count'
								]
							}).then(function(uploadRes) {});
							console.log(req.files);

							count++;
						}, function(err) {
							cb1(err);
						});
					} else {

						api.file.upload({
							name: count + "00" + req.files.fileupload.originalname,
							file: req.files.fileupload.path,
							parentId: "0",
							fields: [
								'total_count'
							]
						}).then(function(uploadRes) {});
					}
				});
		});
		next();
	});

	// create folder code
	// view.on('post', {
	// 	action: 'create'
	// }, function(next) {
	// 	keystone.list('User').model.findOne({
	// 		"_id": req.user.id
	// 	}).exec(function(err, resUser) {
	// 		appAuth({
	// 				publicKey: fs.readFileSync('public_key.pem'),
	// 				privateKey: fs.readFileSync('private_key.pem'),
	// 				algorithm: 'RS256',
	// 				issuer: "q3bx2diw8xuzyurn0ztd31yuqeqjsedg",
	// 				subject: resUser.boxId,
	// 				subjectType: 'user',
	// 				clientId: "q3bx2diw8xuzyurn0ztd31yuqeqjsedg",
	// 				clientSecret: "hUTWsjEIoYRZq0ilKrykoN0tTlT1jE8h",
	// 				publicKeyId: "hhqzcvgu",
	// 				callRetryMax: 5,
	// 				minutesUntilTokenRefresh: 10,
	// 				options: {
	// 					debug: true
	// 				}
	// 			})
	// 			.then(function(api) {
	// 				api.folder.create({
	// 					parentId: 0,
	// 					name: req.body.procedure
	// 				}).then(function(rest) {});
	// 			});
	// 	});
	// 	next();
	// });

};
