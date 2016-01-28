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
	type: {
		type: Types.Html,
		wysiwyg: true,
		height: 50,
	},
	imageOuter: {
		type: Types.CloudinaryImage
	},
	packagecategory: {
		type: Types.Relationship,
		ref: 'PackageCategory'
	},
	description: {
		type: Types.Html,
		wysiwyg: true,
		height: 400
	}
});

Packages.relationship({
	ref: 'PackageSection',
	path: 'package'
});


Packages.schema.methods.getPackageSection = function(done) {
	return keystone.list('PackageSection').model.find({
			"package": this._id
		})
		.exec(done);
};

Packages.schema.methods.getPackageTariff = function(done) {
	return keystone.list('PackageTariff').model.find({
			"package": this._id
		})
		.exec(done);
};
Packages.register();
