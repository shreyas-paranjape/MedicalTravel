var keystone = require('keystone');
var Types = keystone.Field.Types;
var meetTheDoctor = new keystone.List('meetTheDoctor', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});
meetTheDoctor.register();
