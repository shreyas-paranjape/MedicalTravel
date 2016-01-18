var keystone = require('keystone');
var fnjs = require('fn.js');
var Types = keystone.Field.Types;
var Packages = new keystone.List('Packages', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

Packages.add({
	name: {
		type: String,
		required: true,
		index: true
	},
	imageOuter: {
		type: Types.CloudinaryImage
	},
	packagecategory: {
		type: Types.Relationship,
		ref: 'PackageCategory'
	},
	discription: {
		type: Types.Html,
		wysiwyg: true,
		height: 400
	}
});


Packages.register();
