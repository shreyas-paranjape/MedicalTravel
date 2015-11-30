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
	app.get('/procedure/:key', routes.views.procedure);
	app.all('/doctor/:key', routes.views.doctor);
	app.all('/meetTheDoctor', routes.views.meetTheDoctor);
	app.all('/providerInfo/:key', routes.views.providerInfo);
	app.all('/profile', routes.views.profile);
	app.all('/login', routes.views.login);
	app.all('/signup', routes.views.signup);
	app.all('/contact', routes.views.contact);
	app.get('/autocomplete/:model', routes.views.autocomplete);
};
