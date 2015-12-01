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
	description: {
		type: Types.Html,
		wysiwyg: true,
		height: 400
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

Doctor.schema.methods.getProcedures = function(callback) {
	return keystone.list('Procedure').model.find({
		doctors: this._id
	}).populate('providers').populate('speciality').exec(callback);
};


Doctor.register();
