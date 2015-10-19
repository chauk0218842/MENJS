'use strict';

import express from 'express';

let createRouter = express.Router;

/**
 * Create a router method API
 * @param router
 * @param mountPath
 * @param methods
 * @returns {*}
 */
function createRouterAPIMethods(router, mountPath, methods) {
  Object.keys(methods).forEach(method => {
    console.log ('Created mount ' + method + ' ' + mountPath);

    router[method](mountPath, methods[method]);
  });

  return router;
}

/**
 * Create a router API
 * @param routes
 * @param parentMountPath
 * @returns {*}
 */
function createRouterAPI(routes, parentMountPath) {
  let router = createRouter();
  parentMountPath = parentMountPath || '';

  Object.keys(routes).forEach(function (curMountPath) {

    let fullMountPath = (parentMountPath + '/' + curMountPath).replace (/\/\//g, '/');

    if (routes[curMountPath].methods) {
      router = createRouterAPIMethods(router, fullMountPath, routes[curMountPath].methods);
    }

    if (routes[curMountPath].routes) {
      router.use(createRouterAPI(routes[curMountPath].routes, fullMountPath));
    }

  });

  return router;
}

export default {
  createRouter : createRouter,
  createAPI: createRouterAPI
};