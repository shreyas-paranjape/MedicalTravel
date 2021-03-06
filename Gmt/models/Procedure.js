var keystone = require('keystone');
var Types = keystone.Field.Types;
var Procedure = new keystone.List('Procedure', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

Procedure.add({
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
	speciality: {
		type: Types.Relationship,
		ref: 'Speciality',
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

Procedure.relationship({
	ref: 'Price',
	path: 'procedure'
});

Procedure.schema.methods.getPrice = function(done) {
	return keystone.list('Price').model.find()
		.where('procedure', this._id)
		.populate('provider')
		.populate('doctors')
		.exec(done);
};

Procedure.register();
