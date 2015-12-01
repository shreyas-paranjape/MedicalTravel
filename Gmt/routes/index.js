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
	app.get('/providers/:key', routes.views.providers);
	app.get('/procedure/:key', routes.views.procedure);
	app.all('/doctor/:key', routes.views.doctor);
	app.all('/doctors', routes.views.doctors);
	app.all('/provider/:key', routes.views.provider);
	app.all('/profile', routes.views.profile);
	app.all('/login', routes.views.login);
	app.all('/signup', routes.views.signup);
	app.all('/contact', routes.views.contact);
	app.get('/autocomplete/:model', routes.views.autocomplete);
};
