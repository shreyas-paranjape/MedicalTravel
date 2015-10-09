var keystone = require('keystone');
var Types = keystone.Field.Types;
var Admin = new keystone.List('Admin');
Admin.add({
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
	}
}, 'Permissions', {
	isAdmin: {
		type: Boolean,
		label: 'Can access Keystone',
		index: true
	}
});
Admin.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});
Admin.relationship({
	ref: 'Post',
	path: 'posts',
	refPath: 'author'
});
Admin.defaultColumns = 'name, email, isAdmin';
Admin.register();
