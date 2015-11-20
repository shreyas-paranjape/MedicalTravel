var keystone = require('keystone');
var Types = keystone.Field.Types;
var Review = new keystone.List('Review', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

Review.add({
	user: {
		type: Types.Name,
		required: true,
		initial: true,
		index: true
	},
	comments: {
		type: Types.Html,
		wysiwyg: true,
		height: 400
	},
	hits: {
		type: Number,
		required: false

	}
});

Review.relationship({
	ref: 'Provider',
	path: 'reviews'
});
Review.relationship({
	ref: 'Procedure',
	path: 'reviews'
});
Review.relationship({
	ref: 'Doctor',
	path: 'reviews'
});

Review.register();
