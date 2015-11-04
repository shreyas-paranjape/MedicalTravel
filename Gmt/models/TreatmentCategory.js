var keystone = require('keystone');
var Types = keystone.Field.Types;
var TreatmentCategory = new keystone.List('TreatmentCategory', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

TreatmentCategory.add({
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

TreatmentCategory.relationship({
	ref: 'Treatment',
	path: 'treatmentCategory'
});

TreatmentCategory.schema.methods.getTreatments = function(done) {
	return keystone.list('Treatment').model.find()
		.where('treatmentCategory', this._id)
		.populate('providers')
		.populate('doctors')
		.exec(done);
};

TreatmentCategory.register();
