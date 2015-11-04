var keystone = require('keystone');
var Types = keystone.Field.Types;
var Treatment = new keystone.List('Treatment', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});


Treatment.add({
	name: {
		type: String,
		required: true
	},
	image: {
		type: Types.CloudinaryImage
	},
	description: {
		type: Types.Html,
		wysiwyg: true,
		height: 400
	},
	providers: {
		type: Types.Relationship,
		ref: 'Provider',
		many: true
	},
	treatmentCategory: {
		type: Types.Relationship,
		ref: 'TreatmentCategory',
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



Treatment.register();
