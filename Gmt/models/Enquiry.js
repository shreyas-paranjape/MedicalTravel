var keystone = require('keystone');
var Types = keystone.Field.Types;
var Enquiry = new keystone.List('Enquiry', {});
Enquiry.add({
	name: {
		type: Types.Name,
		required: true
	},
	email: {
		type: Types.Email,
		// required: true,
		// initial: false
	},
	phone: {
		type: String
	},
	caseinfo: {
		type: String
	},
	allergies: {
		type: String
	},
	symptoms: {
		type: String
	},
	age: {
		type: String
	},
	gender: {
		type: String
	},
	provider: {
		type: String
	},
	procedure: {
		type: String
	},
	doctor: {
		type: String
	},
	flag: {
		type: String
	},
	state: {
		type: String
	},
	enquiryType: {
		type: Types.Select,
		options: [{
			value: 'message',
			label: 'Just leaving a message'
		}, {
			value: 'question',
			label: 'I\'ve got a question'
		}, {
			value: 'other',
			label: 'Something else...'
		}]
	},
	message: {
		type: Types.Markdown,
		required: true,
		initial: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});
Enquiry.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});
Enquiry.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});
Enquiry.schema.methods.sendNotificationEmail = function(callback) {
	if ('function' !== typeof callback) {
		callback = function() {};
	}

	var mailBody = {};
	mailBody.name = this.name;
	mailBody.phone = this.phone;
	mailBody.email = this.email;
	mailBody.message = this.message;
	mailBody.createdAt = this.createdAt;
	mailBody.procedure = this.procedure;
	mailBody.provider = this.provider;
	mailBody.doctor = this.doctor;
	mailBody.flag = this.flag;

	new keystone.Email('enquiry').send({
		to: 'manjeet959@gmail.com',
		fromName: 'Goa medical travel',
		fromEmail: 'contact@goa-medical-travel.com',
		subject: 'New Enquiry for Goa medical travel',
		mailBody: mailBody
	}, callback);
};
Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
