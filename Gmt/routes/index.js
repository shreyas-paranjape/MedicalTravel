var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
var routes = {
	views: importRoutes('./views')
};
exports = module.exports = function(app) {
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/provider', routes.views.provider);
  app.get('/treatment',routes.views.treatment);
	app.get('/doctor',routes.views.doctor);
	app.get('/user',routes.views.user);
	app.all('/contact', routes.views.contact);
};
