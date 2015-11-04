var keystone = require('keystone');
var fnjs = require('fn.js');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var currentProviderCategoryQuery = keystone.list('ProviderCategory').model.find();
	view.on('init', function(next) {
		currentProviderCategoryQuery.exec(function(err, provCatsRes) {
			res.locals.providerCategories = provCatsRes;

			var currentProvCat = fnjs.filter(function(provCat) {
				return provCat.key == req.params.key;
			}, provCatsRes);

			currentProvCat[0].getProviders(function(e, providersResult) {
				res.locals.providers = providersResult;
				next();
			});

		});
	});
	view.render('provider');
};
