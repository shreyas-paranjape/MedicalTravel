var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Traveller Model
 * ==========
 */

var Traveller = new keystone.List('Traveller');

Traveller.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
Traveller.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Relationships
 */

Traveller.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

Traveller.defaultColumns = 'name, email, isAdmin';
Traveller.register();
