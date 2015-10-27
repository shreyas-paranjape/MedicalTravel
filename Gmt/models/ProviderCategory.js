var keystone = require('keystone');
var Types = keystone.Field.Types;
var ProviderCategory = new keystone.List('ProviderCategory');
ProviderCategory.add({
	name: {
		type: String,
		required: true,
		index: true
	}
});

ProviderCategory.relationship({ ref: 'Provider', path: 'providerCategory' });

ProviderCategory.register();
