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

	boxId: {
		type: String,
		required: false
	},

	boxFile: {
		fileId: {
			type: String,
			required: false,
			many: true,
			index: true
		},
		fileName: {
			type: String,
			required: false,
			many: true,
			index: true
		}
	}
}, 'Permissions', {
	isAdmin: {
		type: Boolean,
		label: 'Can access Keystone',
		index: true
	}
});

User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

User.relationship({
	ref: 'Post',
	path: 'posts',
	refPath: 'author'
});
User.defaultColumns = 'name, email, isAdmin';
User.register();
