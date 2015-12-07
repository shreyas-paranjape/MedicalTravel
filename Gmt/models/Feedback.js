var keystone = require('keystone');
var Types = keystone.Field.Types;
var Feedback = new keystone.List('Feedback', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

Feedback.add({
	name: {
		type: String,
		required: true
	},
	user: {
		type: Types.Relationship,
		ref: 'User',
		many: false
	},
	doctor: {
		type: Types.Relationship,
		ref: 'Doctor',
		many: false
	},
	provider: {
		type: Types.Relationship,
		ref: 'Provider',
		many: false
	},
	parameter: {
		type: Types.Relationship,
		ref: 'Parameter',
		many: false
	},
	rating: {
		type: String,
	},
	comments: {
		type: Types.Html,
		wysiwyg: true,
		height: 200
	}
});

Feedback.register();
