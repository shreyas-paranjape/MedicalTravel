var keystone = require('keystone');
var fnjs = require('fn.js');

exports = module.exports = function(req, res) {
	keystone.list(req.params.model)
		.model.find({
			name: new RegExp(req.query.query, "i")
		})
		.exec(function(err, docs) {
			res.json({
				"suggestions": fnjs.map(function(doc) {
					return {
						"value": doc.name,
						"data": doc.id
					};
				}, docs)
			});
		});
};
