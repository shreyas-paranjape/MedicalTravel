var keystone = require('keystone');
var fnjs = require('fn.js');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);

	var ProvCatQuery = keystone.list('ProviderCategory').model.find();
	view.on('init', function(next) {
		ProvCatQuery.exec(function(err, provCatsRes) {
			res.locals.providerCategories = fnjs.map(function(provider) {
					if (provider.key == req.params.key) {
						provider.active = true;
					}
					return provider;
				}, provCatsRes);

			var ProvCat = fnjs.filter(function(provCat) {
				return provCat.key == req.params.key;
			}, provCatsRes);

			 ProvCat[0].getProviders(function(e, providersRes) {
				res.locals.providers = providersRes;
				next();
			});

		});
	});
	view.render('providers');
};
