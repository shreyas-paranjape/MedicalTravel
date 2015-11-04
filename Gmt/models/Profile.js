var keystone = require('keystone');
var Types = keystone.Field.Types;
var Profile = new keystone.List('Profile');
Profile.add({
  name: {
    type: String
  },
 phone: {
    type: String
  },
  date:{
    type: Date,
		default: Date.now
  },
  email:{
    type:Types.Html
  },
  image:{
      type: Types.CloudinaryImage
  },

  });
Profile.register();
