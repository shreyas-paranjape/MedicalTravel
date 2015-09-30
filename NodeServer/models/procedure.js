var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Procedure Model
 * ==================
 */

var Procedure = new keystone.List('Procedure', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Procedure.add({
	name: { type: String, required: true },
	description: { type: Types.Html, wysiwyg: true, height: 400 }
});

Procedure.register();
