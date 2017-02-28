"use strict";

var utils = require('express-pouchdb/lib/utils');
var jwt = require('jsonwebtoken');

module.exports = function (app) {
  return function (req, res, next) {
    var value = app.couchConfig.get('httpd', 'authentication_handlers') || "";
    if (value.indexOf('jwt') === -1) {
      return next();
    }

    var jwtAlgorithm = app.couchConfig.get('jwt', 'algorithm');
    var jwtSecretOrPublicKey = app.couchConfig.get('jwt', 'secret_or_public_key');
    if (!jwtAlgorithm || !jwtSecretOrPublicKey) {
      throw new Error("Missing jwt.algorithm or jwt.secret_or_public_key");
    }

    var token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];
    var options = {algorithms: [jwtAlgorithm]};
    jwt.verify(token, jwtSecretOrPublicKey, options, function (error, decoded) {
      if (error) {
        utils.sendError(res, error);
        return;
      }

      if (!decoded.userCtx) {
        var missingUserCtxError = new Error("Missing userCtx in payload");
        utils.sendError(res, missingUserCtxError);
        return;
      }

      req.couchSession = {
        ok: true,
        userCtx: decoded.userCtx,
        authorized: "jwt"
      };
      next();
    });
  };
};
