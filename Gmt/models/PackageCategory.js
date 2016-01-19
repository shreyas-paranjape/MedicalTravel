var keystone = require('keystone');
var fnjs = require('fn.js');
var Types = keystone.Field.Types;
var PackageCategory = new keystone.List('PackageCategory', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

PackageCategory.add({
	name: {
		type: String,
		required: true,
		index: true
	},
	packagetype: {
		type: Types.Relationship,
		ref: 'PackageType'
	},
	discription: {
		type: Types.Html,
		wysiwyg: true,
		height: 400
	}
});

PackageCategory.relationship({
	ref: 'Packages',
	path: 'packagecategory'
});

PackageCategory.schema.methods.getPackages = function(done) {
	return keystone.list('Packages').model.find({
			"packagecategory": this._id
		})
		.exec(done);
};

PackageCategory.register();
