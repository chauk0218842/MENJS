'use strict';

require('babel/register');
var server = require ('./lib/server');
var config = require ('./config');
var router = require('./router');
var server = server.createAPI(config, router);

server.listen (process.env.PORT || 3000, function () {
  console.log ('Server listening at http://localhost:' + server.port());
});