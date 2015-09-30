var keystone = require('keystone');
var Types = keystone.Field.Types;

var Service = new keystone.List('Service', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Service.add({
	title: { type: String, required: true },
  description: { type: Types.Html, wysiwyg: true, height: 400 }
});

Service.defaultColumns = 'title,description';
Service.register();
