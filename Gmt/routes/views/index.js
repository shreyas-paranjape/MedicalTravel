var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var key = "Orthopedics";
	var arrTreatmentCategory = [];
	var arrTreatment = [];
	var arrProvider = [];
	var arrDoctor = [];
	var idx;

	var contains = function(aValue, aArray) {
		var idx;
		for (idx = 0; idx < aArray.length; idx++) {
			if (aValue._id.equals(aArray[idx]._id)) {
				return true;
			}
		}
		return false;
	}

	var DocQuery = keystone.list('Doctor').model.findOne({ "name" : "Dr. Berta" });

				view.on('init', function(next) {
					DocQuery.exec(function(err, docRes) {

							keystone.list('Treatment').model
						        .find({ "doctors": docRes.id }, { })
										.populate({ path: 'treatmentCategory',  select: 'name' })
				 	      		.exec(function(er, treatRes) {

								for (idx = 0; idx < treatRes.length; idx++) {
									if (!contains(treatRes[idx], arrTreatment)) {
										arrTreatment.push(treatRes[idx]);
										arrTreatmentCategory.push(treatRes[idx].treatmentCategory);
									}
								}

			            console.log("TreatmentCategory :" +arrTreatmentCategory );


							});
						console.log("Doctor :" + docRes);
						next();
					});
				});
	locals.section = 'home';
	view.render('index');

};


/*		*/
