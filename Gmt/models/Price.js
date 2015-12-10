var keystone = require('keystone');
var Types = keystone.Field.Types;
var Price = new keystone.List('Price', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

Price.add({
	name: {
		type: String,
		required: true
	},
	procedure: {
		type: Types.Relationship,
		ref: 'Procedure',
	},
	provider: {
		type: Types.Relationship,
		ref: 'Provider',
	},
	doctors: {
		type: Types.Relationship,
		ref: 'Doctor',
	},
	price: {
		type: String
	}
});
Price.defaultSort = '-price';
Price.register();
