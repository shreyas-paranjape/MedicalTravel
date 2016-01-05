var keystone = require('keystone');
var Types = keystone.Field.Types;
var User = new keystone.List('User', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

User.add({
	name: {
		type: Types.Name,
		required: true,
		index: true
	},
	email: {
		type: Types.Email,
		initial: true,
		required: true,
		index: true
	},
	password: {
		type: Types.Password,
		initial: true,
		required: true
	},
	lastLogin: {
		type: Date,
	},
	boxId: {
		type: String,
		required: false
	},
	verify: {
		type: String,
		required: false
	},

}, 'Permissions', {
	isAdmin: {
		type: Boolean,
		label: 'Can access Keystone',
		index: true
	},
	isUser: {
		type: Boolean,
		label: 'User',
		index: true
	},
	isDoctor: {
		type: Boolean,
		label: 'Doctor',
		index: true
	},
	isProvider: {
		type: Boolean,
		label: 'Provider',
		index: true
	},
	isAgent: {
		type: Boolean,
		label: 'Agent',
		index: true
	},

});

User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

User.relationship({
	ref: 'Post',
	path: 'posts',
	refPath: 'author'
});
User.relationship({
	ref: 'Feedback',
	path: 'user',
});

User.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});
User.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});
User.schema.methods.sendNotificationEmail = function(callback) {
	if ('function' !== typeof callback) {
		callback = function() {};
	}

	var mailBody = {};
	mailBody.name = this.name;
	mailBody.email = this.email;

	new keystone.Email('signup').send({
		to: this.email,
		fromName: 'Goa medical travel',
		fromEmail: 'contact@goa-medical-travel.com',
		subject: 'User Confirmation',
		mailBody: mailBody
	}, callback);
};


User.defaultColumns = 'name, email, isAdmin';
User.register();
