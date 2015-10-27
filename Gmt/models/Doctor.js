var keystone = require('keystone');
var Types = keystone.Field.Types;
var Doctor = new keystone.List('Doctor');
Doctor.add({
  name: {
    type: String
  },
  imageOuter: {
    type: Types.CloudinaryImage
  },
  description:{
    type: Types.Html,
  },
  data:{
    type:Types.Html
  },
});

Doctor.relationship({ ref: 'Treatment', path: 'doctors' });
Doctor.relationship({ ref: 'Provider', path: 'doctors' });

Doctor.register();
