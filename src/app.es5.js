'use strict';

require('babel/register');
var serverAPI = require ('./lib/server/server-api');
var config = require ('./config');
var router = require('./router');
var server = serverAPI.configure(serverAPI.create(), config, router);

server.listen (process.env.PORT || 3000, function () {
  console.log ('Server listening at http://localhost:' + server.port());
});