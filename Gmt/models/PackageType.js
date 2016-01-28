var keystone = require('keystone');
var fnjs = require('fn.js');
var Types = keystone.Field.Types;
var PackageType = new keystone.List('PackageType', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

PackageType.add({
	name: {
		type: String,
		required: true,
		index: true
	},
	description: {
		type: Types.Html,
		wysiwyg: true,
		height: 400
	}
});

PackageType.relationship({
	ref: 'PackageCategory',
	path: 'packagetype'
});

PackageType.register();
