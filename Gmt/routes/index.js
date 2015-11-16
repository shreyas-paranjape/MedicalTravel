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
	app.get('/provider/:key', routes.views.provider);
  app.get('/treatment/:key',routes.views.treatment);
	app.get('/doctor/:key',routes.views.doctor);
	app.get('/user',routes.views.user);
  app.get('/profile',routes.views.profile);
	app.get('/login',routes.views.login);
	app.get('/signup',routes.views.signup);
	app.all('/contact', routes.views.contact);
};
