var keystone = require('keystone');
var Types = keystone.Field.Types;
var Treatment = new keystone.List('Treatment');
Treatment.add({
  imageOuter: {
    type: Types.CloudinaryImage
  },
  description:{
    type: Types.Html,
  },
  name:{
    type:String,
    required:true
  },
  imageInner: {
    type: Types.CloudinaryImage
  },
});
Treatment.register();
