var keystone = require('keystone');
var Types = keystone.Field.Types;
var Provider = new keystone.List('Provider');
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
		type:Types.Html
	},
	providerCategory: {
		type: Types.Relationship,
		ref: 'ProviderCategory'
	},
	doctors: {
		type: Types.Relationship,
		ref: 'Doctor',
		many: true
	}
});

Provider.relationship({ ref: 'Treatment', path: 'providers' });

Provider.register();
