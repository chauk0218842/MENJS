'use strict';

import express from 'express';

function serverErrorHandler(server, err, req, res, next) {
  res.status(err.status || 500);

  if (server.get('env') === 'development') {
    res.send(err.stack);
  }
  else {
    res.send('Server blew up!');
  }
}

function serverLogErrors(server, err, req, res, next) {

  if (server.get('env') === 'development') {
    console.error(err.stack);
  }

  next(err);
}

function serverListen(server, port, callback) {
  return server.listen(port, callback);
}

export default {
  create: function (config, router) {

    let server = express();
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
    server.use(serverLogErrors.bind(null, server));
    server.use(serverErrorHandler.bind(null, server));

    return {
      listen: function (port, callback) {
        listeningServer = serverListen(server, port, callback);
      },

      port: function () {
        return listeningServer.address().port;
      }
    };
  }

};