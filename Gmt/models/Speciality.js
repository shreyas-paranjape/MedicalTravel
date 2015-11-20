var keystone = require('keystone');
var Types = keystone.Field.Types;
var Speciality = new keystone.List('Speciality', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

Speciality.add({
	name: {
		type: String,
		required: true,
		index: true
	},
	imageOuter: {
		type: Types.CloudinaryImage
	},
	discription: {
		type: Types.Html,
		wysiwyg: true,
		height: 400
	}
});

Speciality.relationship({
	ref: 'Procedure',
	path: 'specialities'
});

Speciality.schema.methods.getProcedures = function(done) {
	return keystone.list('Procedure').model.find()
		.where('speciality', this._id)
		.populate('providers')
		.populate('doctors')
		.exec(done);
};

Speciality.register();
