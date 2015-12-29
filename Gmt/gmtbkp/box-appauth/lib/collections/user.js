"use strict";

var util = require('util');
var request = require('request');
var _ = require('lodash');

// @param env {Object}	Various call environment methods.
//
// @param env.access_token {String}	The access token.
// @param env.issued_at {Integer}	Ms timestamp at creation time.
// @param env.expires_at {Integer}	Ms expiry timestamp.
// @param env.toNumberOrThrow {Function}	Converts to a valid number where
//											needed, such as with an item id,
//											or throws.
// @param env.toValidLimitOrThrow {Function}	Ensure limit argument is valid,
//												set default if undefined,
//												throw otherwise.
// @param env.toValidOffsetOrThrow {Function}	Ensure offset argument is valid,
//												set default if undefined,
//												throw otherwise.
// @param env.toFieldStringOrThrow {Function}	Convert field argument to a
//												correct string, or throw if
//												defined but malformed.
// @param env.env.toValidNameOrThrow {Function}	Ensure file/folder names conform
//												to Box specifications.
// @param env.complete {Function}	Use this to handle responses.
// @param env.prepare {Function}	Prep your call object headers with this.
//									Primarily, this handles Bearer header.
// @param env.revoke {Function}	Disables this api by revoking token validity.
// @param env.asUser {Function}	Rather than setting 'As-User' header on every
//								call, have all future calls impersonate user.
//
module.exports = function(env) {

	// All methods for Box folders api
	//
	return {
   /*
		info: function(args, cb) {

			var userId = env.toNumberOrThrow(args.id, 'user:info#id');

			request.get(env.prepare({
				url: util.format(
					'https://api.box.com/2.0/users/%d',
					userId
				)
			}), env.complete(cb));
		},
   */

		create: function(args, cb) {

			var name = env.toValidNameOrThrow(args.name);

			if (!/^[a-z0-9_-]{2,}$/i.test(name)) {
				throw new Error('Malformed user name sent to #users.create');
			}

			request.post(env.prepare({
				url: util.format(
					'https://api.box.com/2.0/users'
				),
				body: util.format(
					'{"name":"%s", "is_platform_access_only": true}',
					name
				)
			}), env.complete(cb));
		},

	};
};
