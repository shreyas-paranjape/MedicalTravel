var keystone = require('keystone');
var Types = keystone.Field.Types;
var MedicalFacility = new keystone.List('MedicalFacility');
MedicalFacility.add({
	name: {
		type: Types.Name,
		required: true,
		index: true
	}
});
MedicalFacility.register();
