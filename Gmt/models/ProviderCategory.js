var keystone = require('keystone');
var Types = keystone.Field.Types;
var ProviderCategory = new keystone.List('ProviderCategory', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

ProviderCategory.add({
	name: {
		type: String,
		required: true,
		index: true
	},
	discription: {
		type: Types.Html,
		wysiwyg: true,
		height: 400
	}
});

ProviderCategory.relationship({
	ref: 'Provider',
	path: 'providerCategory'
});

ProviderCategory.schema.methods.getProviders = function(callback){
	return keystone.list('Provider')
		.model
		.find({
			providerCategory: this._id
		}).exec(callback);
};

ProviderCategory.register();
