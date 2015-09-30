var keystone = require('keystone');
var Types = keystone.Field.Types;

var Facility = new keystone.List('Facility', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Facility.add({
	title: { type: String, required: true },
  description: { type: Types.Html, wysiwyg: true, height: 400 }
});

Facility.defaultColumns = 'title,description';
Facility.register();
