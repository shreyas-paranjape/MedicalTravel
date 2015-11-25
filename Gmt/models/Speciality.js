var keystone = require('keystone');
var fnjs = require('fn.js');
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

var contains = function(aValue, aArray) {
	var idx;
	for (idx = 0; idx < aArray.length; idx++) {
		if (aValue._id.equals(aArray[idx]._id)) {
			return true;
		}
	}
	return false;
}

Speciality.schema.methods.getProcedures = function(done) {
	return keystone.list('Procedure').model.find({
			"speciality": this._id
		})
		.populate('providers')
		.populate('doctors')
		.exec(done);
};

Speciality.schema.methods.getDoctorsAndProviders = function(callback) {
	var doctors = [];
	var providers = [];
	this.getProcedures(function(err, procedures) {
		fnjs.each(function(procedure) {
			fnjs.each(function(doctor) {
				if (!contains(doctor, doctors)) {
					doctors.push(doctor);
				}
			}, procedure.doctors);
			fnjs.each(function(provider) {
				if (!contains(provider, providers)) {
					providers.push(provider);
				}
			}, procedure.providers);
		}, procedures);
		callback(doctors, providers);
	});
};

Speciality.register();
