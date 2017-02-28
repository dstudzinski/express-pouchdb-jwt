var express = require('express');
var ExpressPouchDB = require('express-pouchdb');
var PouchDB = require('pouchdb');
var ExpressPouchDBJWT = require('express-pouchdb-jwt');

var app = express();

var DB_ROUTES_PREFIX = '/db'; // all db routes will be prefixed with this
var JWT_SECRET = 'secret'; // adjust jwt secret
var JWT_ALGORITHM = 'HS256'; // usually you don't need to change it

// You don't need 'authentication' routes because auth will be done with jwt
// example taken from express-pouchdb
var expressPouchDB = ExpressPouchDB(PouchDB, {
  mode: 'fullCouchDB', // specified for clarity. It's the default so not necessary.
  overrideMode: {
    exclude: [
      'routes/authentication',
      // disabling the above, gives error messages which require you to disable the
      // following parts too. Which makes sense since they depend on it.
      'routes/authorization',
      'routes/session'
    ]
  }
});

// store jwt settings in expressPouchDB couchdb configuration:
expressPouchDB.couchConfig.set('httpd', 'authentication_handlers', 'jwt', function () {});
expressPouchDB.couchConfig.set('jwt', 'algorithm', JWT_ALGORITHM, function () {});
expressPouchDB.couchConfig.set('jwt', 'secret_or_public_key', JWT_SECRET, function () {});

// add jwt middleware before all expressPouchDB routes (will be secured by jwt)
app.use(DB_ROUTES_PREFIX, ExpressPouchDBJWT(expressPouchDB), expressPouchDB);

app.listen(3000);
console.log('Listening on port 3000');
