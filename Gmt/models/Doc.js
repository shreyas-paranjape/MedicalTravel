var keystone = require('keystone');
var Types = keystone.Field.Types;
var Doc = new keystone.List('Doc', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});
Doc.register();
