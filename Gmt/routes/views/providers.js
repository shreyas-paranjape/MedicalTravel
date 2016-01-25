var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);

	res.locals.providerCategory = [];
	res.locals.providerCategories = [];

	//main query
	var ProvCatQuery = keystone.list('ProviderCategory').model.find();
	view.on('init', function(next) {
		ProvCatQuery.exec(function(err, provCatsRes) {

			//mapping with key for side menu
			async.map(provCatsRes, function(provider) {
				res.locals.providerCategories.push(provider);
				if (provider.key == req.params.key) {
					provider.active = true;
				}
				return provider;
			}, function(err) {
				next(err);
			});

			//filtering the providerCategories from the key
			async.filter(provCatsRes, function(provCat, callback) {
				if (provCat.key == req.params.key) {
					callback(true);
				} else {
					callback(false);
				}
			}, function(provCat) {

				//getting for providers for that providerCategory
				res.locals.providerCategory.push(provCat[0].name);
				provCat[0].getProviders(function(e, providersRes) {
					res.locals.providers = providersRes;
					next();
				});
			});
		});
	});
	view.render('providers');
};
