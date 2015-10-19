'use strict';

import bodyParser from 'body-parser';

export default {
  options: [
    bodyParser.urlencoded({extended: true}),
    bodyParser.json(),
    function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
      next();
    },

    function (req, res, next) {
      console.log (Date() + ' Request received: ' + req.originalUrl);
      next();
    }
  ]
};