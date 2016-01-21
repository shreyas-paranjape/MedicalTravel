var keystone = require('keystone');
var async = require('async');
var fnjs = require('fn.js');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'home';
	res.locals.packageCategory1 = [];
	res.locals.packageCategory2 = [];
	res.locals.packages = [];

	//List all PackageCategories
	var packageCatQuery = keystone.list('PackageCategory').model.find().populate('packagetype');

	view.on('init', function(next) {
		packageQuery.exec(function(err_s, packageResult) {
			async.each(packageResult, function(packageRes, cb1) {

					//Side Nav Menu
					keystone.list('PackageCategory').model.find().populate('packagetype').exec(function(err, packageCatRes) {
						async.each(packageCatRes, function(packageCat, cb2) {
								if (packageCat.packagetype.name == "Package") {
									res.locals.packageCategory1.push(packageCat);
								} else if (packageCat.packagetype.name == "Checkups") {
									res.locals.packageCategory2.push(packageCat);
								}
								if (packageCat.id == packageRes.packagecategory.id) {
									packageCat.active = true;
								}
								cb2();
							},
							function(err) {
								cb1();
							});
					});

					//Package Sections
					packageRes.getPackageSection(function(err, sectionRes) {
						async.each(sectionRes, function(section, cb3) {
								res.locals.packageSection.push(section)
							},
							function(err) {

							});
					});
				},
				function(err) {
					next(err);
				});
		});
	});

	view.render('package');
};
