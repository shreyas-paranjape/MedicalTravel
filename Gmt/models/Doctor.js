var keystone = require('keystone');
var Types = keystone.Field.Types;
var Doctor = new keystone.List('Doctor');
Doctor.add({
  imageOuter: {
    type: Types.CloudinaryImage
  },
  description:{
    type: Types.Html,
  },



});
Doctor.register();
