var keystone = require('keystone');
var Types = keystone.Field.Types;

var Procedure = new keystone.List('Procedure', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Procedure.add({
	title: { type: String, required: true },
  description: { type: Types.Html, wysiwyg: true, height: 400 }
});

Procedure.defaultColumns = 'title,description';
Procedure.register();
