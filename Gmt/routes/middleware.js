var _ = require('underscore');
exports.initLocals = function(req, res, next) {
	var locals = res.locals;
	locals.navLinks = [{
		label: 'Packages',
		key: 'packages',
		href: '/packages/allopathy'
	}, {
		label: 'Providers',
		key: 'provider',
		href: '/providers/hospitals'
	}, {
		label: 'Specialities',
		key: 'procedure',
		href: '/procedure/bones-and-joints'
	}, {
		label: 'Doctors',
		key: 'doctors',
		href: '/doctors'
	}, {
		label: 'Services',
		key: 'services',
		href: '/services'
	}, ];

	locals.navs = [{
		label: 'Login/Sign Up',
		key: 'login',
		href: '/login'
	}, {
		label: 'Logout',
		key: 'logout',
		href: '/logout'
	}];

	locals.user = req.user;
	next();
};

exports.flashMessages = function(req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	res.locals.messages = _.any(flashMessages, function(msgs) {
		return msgs.length;
	}) ? flashMessages : false;
	next();
};
exports.requireUser = function(req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
