var keystone = require('keystone');
var Types = keystone.Field.Types;
var ProviderCategory = new keystone.List('ProviderCategory');
ProviderCategory.add({
	name: {
		type: Types.Name,
		required: true,
		index: true
	}
});

ProviderCategory.relationship({ ref: 'Provider', path: 'providerCategory' });

ProviderCategory.register();
