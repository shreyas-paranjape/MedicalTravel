var keystone = require('keystone');
var Types = keystone.Field.Types;
var Provider = new keystone.List('Provider');
Provider.add({
	name: {
		type: Types.Name,
		required: true,
		index: true
	},
	imageOuter: {
		type: Types.CloudinaryImage
	},

});
Provider.register();
