var keystone = require('keystone');
var async = require('async');
var Enquiry = keystone.list('Enquiry');
var appAuth = require('box-appauth');
var fs = require('fs');


exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	res.locals.procedures = [];
	res.locals.providers = [];
	res.locals.speciality = [];

	var contains = function(aValue, aArray) {
		var idx;
		for (idx = 0; idx < aArray.length; idx++) {
			if (aValue._id.equals(aArray[idx]._id)) {
				return true;
			}
		}
		return false;
	}

	//Get the doctor as per the key
	var doctorQuery = keystone.list('Doctor').model.findOne({
		key: req.params.key
	});
	view.on('init', function(next) {
		doctorQuery.exec(function(err, doctorRes) {
			res.locals.doctor = doctorRes;
			//get all procedures of that doctor
			doctorRes.getProcedures(function(er, procedureRes) {
				async.each(procedureRes, function(procedure, cb1) {
					if (!contains(procedure, res.locals.procedures)) {
						res.locals.procedures.push(procedure);
					}
					async.each(procedure.providers, function(provider, cb2) {
						if (!contains(provider, res.locals.providers)) {
							res.locals.providers.push(provider);
						}
					}, function(err) {
						cb1(err);
					});
				}, function(err) {
					next(err);
				});
				async.each(procedureRes, function(sp, next) {
					if (!contains(sp.speciality, res.locals.speciality)) {
						res.locals.speciality.push(sp.speciality);
					}
				}, function(err) {
					next(err);
				});
			});
			next();
		});
	});


	// Enquiry form Data submission
	view.on('post', {
		action: 'second'
	}, function(next) {
		var newQuery = new Enquiry.model(),
			updater = newQuery.getUpdateHandler(req);
		keystone.list('Doctor').model.findOne({
			key: req.params.key
		}).exec(function(err, result) {
			req.body.doctor = result.name; //Doctor name
			req.body.flag = "SecondOpenion"; //Type of Form
			updater.process(req.body, {
				flashErrors: false,
				fields: 'name, email, phone, caseinfo, allergies, symptoms, doctor, flag, age, gender',
				errorMessage: 'Cannot load'
			}, function(err) {
				if (err) {
					locals.validationErrors = err.errors;
					console.log(err.errors);
				} else {
					locals.consultationSent = true;
					//Upload files to Box
					appAuth({
							publicKey: fs.readFileSync('public_key.pem'),
							privateKey: fs.readFileSync('private_key.pem'),
							algorithm: 'RS256',
							issuer: "q3bx2diw8xuzyurn0ztd31yuqeqjsedg",
							subject: "263917765",
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
										name: req.body.email + "00" + count + "00" + file.originalname,
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
								console.log("Don File");
							} else {
								api.file.upload({
									name: req.body.email + "00" + count + "00" + req.files.fileupload.originalname,
									file: req.files.fileupload.path,
									parentId: "0",
									fields: [
										'total_count'
									]
								}).then(function(uploadRes) {});
								console.log("Ek File");
							}
						});
				}
			});

		});
		next();
	});
	view.render('doctor');
};
