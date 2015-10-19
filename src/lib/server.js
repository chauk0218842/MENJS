'use strict';

import express from 'express';

let createServer = express();

/**
 * Error handler
 * @param server
 * @param err
 * @param req
 * @param res
 * @param next
 */
function errorHandler(server, err, req, res, next) {
  res.status(err.status || 500);

  if (server.get('env') === 'development') {
    res.send(err.stack);
  }
  else {
    res.send('Server blew up!');
  }
}

/**
 * Error logger
 * @param server
 * @param err
 * @param req
 * @param res
 * @param next
 */
function logErrors(server, err, req, res, next) {

  if (server.get('env') === 'development') {
    console.error(err.stack);
  }

  next(err);
}

/**
 * Server port listener - initiates server
 * @param server
 * @param port
 * @param callback
 * @returns {*|http.Server}
 */
function listenToPort(server, port, callback) {
  return server.listen(port, callback);
}

/**
 * Create a server API
 * @param config
 * @param router
 * @returns {{listen: Function, port: Function}}
 */
function createServerAPI (config, router) {

  let server = createServer;
  let listeningServer;

  /**
   * Configuration
   */
  server.use(config);

  /**
   * Mounts
   */
  server.use('/', router);

  /**
   * Default 404 handler
   */
  server.use('*', function (req, res) {
    res.status(404);
    res.send('Page not found!');
  });

  /**
   * Error handlers
   */
  server.use(logErrors.bind(null, server));
  server.use(errorHandler.bind(null, server));

  return {
    listen: function (port, callback) {
      listeningServer = listenToPort(server, port, callback);
    },

    port: function () {
      return listeningServer.address().port;
    }
  };
}

export default {
  createAPI: createServerAPI
};