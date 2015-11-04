var keystone = require('keystone');
var Types = keystone.Field.Types;
var Doctor = new keystone.List('Doctor' , {
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
	ref: 'Treatment',
	path: 'doctors'
});
Doctor.relationship({
	ref: 'Provider',
	path: 'doctors'
});

Doctor.schema.methods.getTreatments = function(callback){
	return keystone.list('Treatment')
		.model
		.find({
			doctors:{ $in:[this._id]}
		}).exec(callback);
};


Doctor.register();
