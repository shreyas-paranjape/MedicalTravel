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
	app.get('/doctor/:key', routes.views.doctor);
	app.get('/provider_info/:key', routes.views.provider_info);
	app.all('/profile', routes.views.profile);
	app.all('/login', routes.views.login);
	app.all('/signup', routes.views.signup);
	app.all('/doc', routes.views.doc);
	app.all('/contact', routes.views.contact);
};
