var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	res.locals.packageCategory1 = [];
	res.locals.packageCategory2 = [];
	res.locals.packageCate = [];
	res.locals.packages = [];

	//List all PackageCategories
	var packageCatQuery = keystone.list('PackageCategory').model.find().populate('packagetype');

	view.on('init', function(next) {
		packageCatQuery.exec(function(err_s, packageCatRes) {

			//maping with key for side menu
			async.map(packageCatRes, function(packageCat, cb1) {
				if (packageCat.packagetype.name == "Package") {
					res.locals.packageCategory1.push(packageCat);
				} else if (packageCat.packagetype.name == "Checkups") {
					res.locals.packageCategory2.push(packageCat);
				}
				if (packageCat.key == req.params.key) {
					packageCat.active = true;
					res.locals.packageCate.push(packageCat.name);
				}
			}, function(err) {
				next(err);
			});

			//Filte packages w.r.t key
			async.filter(packageCatRes, function(packages, callback) {
				if (packages.key == req.params.key) {
					callback(true);
				} else {
					callback(false);
				}
			}, function(packages) {

				//Find packages of particular packageCategory
				packages[0].getPackages(function(e, result) {
					async.each(result, function(pack, cb1) {
						res.locals.packages.push(pack);
						cb1();
					}, function(err) {
						next(err);
					});
				});
			});
		});
	});
	view.render('packages');
};
