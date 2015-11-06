var keystone = require('keystone');
var Types = keystone.Field.Types;
var Provider = new keystone.List('Provider', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});


Provider.add({
	name: {
		type: String,
		required: true,
		index: true
	},
	image: {
		type: Types.CloudinaryImage
	},
	description:{
		type: Types.Html,
		wysiwyg: true,
		height: 400
	},
	providerCategory: {
		type: Types.Relationship,
		ref: 'ProviderCategory'
	},
	doctors: {
		type: Types.Relationship,
		ref: 'Doctor',
		many: true
	},
	reviews: {
			type: Types.Relationship,
			ref: 'Review',
			many: true
	}
});

Provider.relationship({ ref: 'Treatment', path: 'providers' });

Provider.register();
