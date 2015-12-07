var keystone = require('keystone');
var Types = keystone.Field.Types;
var Parameter = new keystone.List('Parameter', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

Parameter.add({
	name: {
		type: String,
		required: true,
		index: true
	},
});

Parameter.relationship({
	ref: 'Feedback',
	path: 'parameter'
});

Parameter.register();
