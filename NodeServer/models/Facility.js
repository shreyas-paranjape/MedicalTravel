var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Facility Model
 * ==================
 */

var Facility = new keystone.List('Facility', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Facility.add({
	name: { type: String, required: true },
	description: { type: Types.Html, wysiwyg: true, height: 400 }
});

Facility.register();
