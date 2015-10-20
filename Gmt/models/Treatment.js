var keystone = require('keystone');
var Types = keystone.Field.Types;
var Treatment = new keystone.List('Treatment');
Treatment.add({
  name:{
    type:String,
    required:true
  },
  description:{
    type: Types.Html,
  },
  treatmentCategory: {
      type: Types.Relationship,
      ref: 'TreatmentCategory',
  },
  image: {
    type: Types.CloudinaryImage
  },
  providers: {
    type: Types.Relationship,
		ref: 'Provider',
    many:true
  },
  doctors: {
    type: Types.Relationship,
    ref: 'Doctor',
    many:true
  }
});
Treatment.register();
