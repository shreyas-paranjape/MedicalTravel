var keystone = require('keystone');
var Types = keystone.Field.Types;
var Doctor = new keystone.List('Doctor', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

Doctor.add({
	name: {
		type: String,
		required: true,
	},
	imageOuter: {
		type: Types.CloudinaryImage
	},
	panelist: {
		type: String,
	},
	summary: {
		type: Types.Html,
		wysiwyg: true,
		height: 100
	},
	expertise: {
		type: Types.Html,
		wysiwyg: true,
		height: 100
	},
	philosophy: {
		type: Types.Html,
		wysiwyg: true,
		height: 100
	},
	description: {
		type: Types.Html,
		wysiwyg: true,
		height: 300
	},
	reviews: {
		type: Types.Relationship,
		ref: 'Review',
		many: true
	}
});

Doctor.relationship({
	ref: 'Procedure',
	path: 'doctors'
});
Doctor.relationship({
	ref: 'Provider',
	path: 'doctors'
});
Doctor.relationship({
	ref: 'Price',
	path: 'doctor'
});
Doctor.relationship({
	ref: 'Feedback',
	path: 'doctor'
});
Doctor.schema.methods.getProcedures = function(callback) {
	return keystone.list('Procedure').model.find({
			doctors: this._id
		})
		.populate('providers')
		.populate('speciality')
		.exec(callback);
};


Doctor.register();
