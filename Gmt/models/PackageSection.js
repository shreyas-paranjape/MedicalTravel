var keystone = require('keystone');
var fnjs = require('fn.js');
var Types = keystone.Field.Types;
var PackageSection = new keystone.List('PackageSection', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

PackageSection.add({
	name: {
		type: String,
		required: true,
		index: true
	},
	package: {
		type: Types.Relationship,
		ref: 'Packages'
	},
	description: {
		type: Types.Html,
		wysiwyg: true,
		height: 400
	}
});

PackageSection.register();
