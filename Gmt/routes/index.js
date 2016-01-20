var keystone = require('keystone');
var middleware = require('./middleware');

// passport passport-local morgan cookie-parser body-parser express-session connect-ensure-login
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var findById = function(id, cb) {
	process.nextTick(function() {
		keystone.list('User').model.findOne({
			_id: id
		}).exec(function(err, userRes) {
			if (userRes != null) {
				cb(null, userRes);
			} else {
				cb(new Error('User ' + id + ' does not exist'));
			}
		});
	});
};

var findByUsername = function(username, cb) {
	process.nextTick(function() {
		keystone.list('User').model.findOne({
			email: username
		}).exec(function(err, userRes) {
			return cb(null, userRes);
		});
	});
};

passport.use(new Strategy(
	function(username, pass, cb) {
		findByUsername(username, function(err, user) {
			if (err) {
				return cb(err);
			}
			if (!user) {
				return cb(null, false);
			} else {
				// console.log("matching passwords");
				user._.password.compare(pass, function(err, isMatch) {
					if (!err && isMatch) {
						// console.log("passwords equal");
						return cb(null, user);
					} else {
						// console.log("passwords not equal");
						return cb(null, false);
					}
				});
			}
		});
	}));

passport.serializeUser(function(user, cb) {
	cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	findById(id, function(err, user) {
		if (err) {
			return cb(err);
		}
		cb(null, user);
	});
});

var importRoutes = keystone.importer(__dirname);
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', require('morgan')('combined'));
keystone.pre('routes', require('cookie-parser')());
keystone.pre('routes', require('body-parser').urlencoded({
	extended: true
}));
keystone.pre('routes', require('express-session')({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));
keystone.pre('routes', passport.initialize());
keystone.pre('routes', passport.session());

keystone.pre('render', middleware.flashMessages);

var routes = {
	views: importRoutes('./views')
};
exports = module.exports = function(app) {
	app.get('/',
		require('connect-ensure-login').ensureLoggedIn(), routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/packages/:key',
		require('connect-ensure-login').ensureLoggedIn(), routes.views.packages);
	// app.get('/connect', routes.views.connect);

	app.get('/providers/:key',
		require('connect-ensure-login').ensureLoggedIn(), routes.views.providers);
	app.get('/procedure/:key',
		require('connect-ensure-login').ensureLoggedIn(), routes.views.procedure);
	app.get('/services',
		require('connect-ensure-login').ensureLoggedIn(), routes.views.services);
	app.all('/doctor/:key',
		require('connect-ensure-login').ensureLoggedIn(), routes.views.doctor);
	app.all('/doctors',
		require('connect-ensure-login').ensureLoggedIn(), routes.views.doctors);
	app.all('/provider/:key',
		require('connect-ensure-login').ensureLoggedIn(),routes.views.provider);
	app.all('/profile',
		require('connect-ensure-login').ensureLoggedIn(),
		routes.views.profile);
	app.all('/verify/:key', routes.views.verify);
	app.get('/login', routes.views.login);
	app.post('/login',
		passport.authenticate('local', {
			failureRedirect: '/login'
		}),
		function(req, res) {
			res.redirect('/');
		});
	app.get('/logout',
		function(req, res) {
			req.logout();
			res.redirect('/');
		});
	app.all('/signup', routes.views.signup);
	app.all('/contact', routes.views.contact);
	app.get('/autocomplete/:model', routes.views.autocomplete);
};
