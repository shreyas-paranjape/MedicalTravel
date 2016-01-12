var keystone = require('keystone');
var fnjs = require('fn.js');
var appAuth = require('box-appauth');
var fs = require('fs');
var async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'profile';
	res.locals.files = [];


	// initial nevigation
	keystone.list('User').model.findOne({
		_id: req.user.id,
	}).exec(function(err, resUser) {
		if (resUser.verify == "Yes") {
			view.render('profile');
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
					publicKeyId: "v8vvf8zn",
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
							fnjs.each(function(folderRes) {
								// if (folderRes.type == "folder") {
								// 	api.folder.list({
								// 		id: folderRes.id,
								// 	}).then(function(inFolderRes) {
								// 		fnjs.each(function(inFolder) {
								// 			res.locals.files(inFolder.name);
								// 			console.log("Names in folder : " + JSON.stringify(inFolder.name));
								// 		}, inFolderRes.entries)
								// 	});
								//
								// }
								res.locals.files.push(folderRes);
								console.log("Names in Root : " + JSON.stringify(folderRes.name));
							}, listRes.entries)
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
	// 				publicKeyId: "v8vvf8zn",
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
		console.log("File" + JSON.stringify(req.files));
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
					publicKeyId: "v8vvf8zn",
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
								name: count + 00 + file.originalname,
								file: file.path,
								parentId: "0",
								fields: [
									'total_count'
								]
							}).then(function(uploadRes) {});
							count++;
						}, function(err) {
							cb1(err);
						});
						console.log("Many");
					} else {
						api.file.upload({
							name: count + 00 + req.files.fileupload.originalname,
							file: req.files.fileupload.path,
							parentId: "0",
							fields: [
								'total_count'
							]
						}).then(function(uploadRes) {});
						console.log("One");
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
	// 				publicKeyId: "v8vvf8zn",
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
