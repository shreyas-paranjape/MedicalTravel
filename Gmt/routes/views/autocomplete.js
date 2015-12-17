var keystone = require('keystone');
var fnjs = require('fn.js');
var async = require('async');

var singleSearch = function(model, req, res) {
	async.parallel(
		[
			function(callback) {
				searchDocs(req.params.model, new RegExp(req.query.query, "i"), callback);
			},
		],
		function(err, results) {
			var suggestions = [];
			fnjs.each(function(result) {
				fnjs.each(function(suggestion) {
					suggestions.push(suggestion);
				}, result);
			}, results);
			res.json({
				"suggestions": suggestions
			});
		});
};

var searchDocs = function(model, regex, callback) {
	keystone.list(model)
		.model.find({
			name: regex
		})
		.exec(function(err, docs) {
			callback(false, fnjs.map(function(doc) {
				return {
					"value": doc.name,
					"data": model + ":" + doc.id
				};
			}, docs));
		});
};

var globalSearch = function(model, req, res) {
	async.parallel(
		[
			function(callback) {
				searchDocs("Procedure", new RegExp(req.query.query, "i"), callback);
			},
			function(callback) {
				searchDocs("Speciality", new RegExp(req.query.query, "i"), callback);
			},
			function(callback) {
				searchDocs("Doctor", new RegExp(req.query.query, "i"), callback);
			},
			function(callback) {
				searchDocs("Provider", new RegExp(req.query.query, "i"), callback);
			},
		],
		function(err, results) {
			var suggestions = [];
			fnjs.each(function(result) {
				fnjs.each(function(suggestion) {
					suggestions.push(suggestion);
				}, result);
			}, results);
			res.json({
				"suggestions": suggestions
			});
		});
}

exports = module.exports = function(req, res) {
	if ("global" === req.params.model) {
		globalSearch(req.params.model, req, res);
	} else {
		singleSearch(req.params.model, req, res);
	}
};
