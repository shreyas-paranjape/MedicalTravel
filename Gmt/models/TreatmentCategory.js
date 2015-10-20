var keystone = require('keystone');
var Types = keystone.Field.Types;
var TreatmentCategory = new keystone.List('TreatmentCategory');
TreatmentCategory.add({
	name: {
		type: Types.Name,
		required: true,
		index: true
	},
	imageOuter: {
		type: Types.CloudinaryImage
	},

});
TreatmentCategory.register();
