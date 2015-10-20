'use strict';

import express from 'express';

let createRouter = express.Router;

/**
 * Map router mounts helper util
 * @param handler
 * @param routes
 * @returns {*}
 */
function mapMounts(handler, routes) {
  Object.keys(routes).forEach(mountPath => {
    routes[mountPath] = handler(routes[mountPath], mountPath, routes)
  });

  return routes;
}

/**
 * Map mounts' methods helper util
 * @param handler
 * @param methods
 * @param mountPath
 * @param mount
 * @returns {*}
 */
function mapMethods(handler, methods, mountPath, mount) {
  Object.keys(methods).forEach(type => {
    methods[type] = handler(methods[type], type, mountPath, mount);
  });

  return methods;
}

/**
 * Create a router API
 * @param router
 * @param rootMountPath
 * @param routes
 * @returns {*}
 */
function createAPI(router, rootMountPath, routes) {

  rootMountPath = rootMountPath || '';
  mapMounts(function (route, mountPath, mount) {

    if (route.methods) {
      mapMethods(function (method, type, mountPath) {
        let fullMountPath = (rootMountPath + '/' + mountPath).replace(/\/\//g, '/');
        router[type](fullMountPath, method);
        console.log('Created mount ' + type + ' ' + fullMountPath);

        return method;
      }, route.methods, mountPath, mount);
    }

    if (route.routes) {
      let fullMountPath = (rootMountPath + '/' + mountPath).replace(/\/\//g, '/');
      router.use(fullMountPath, createAPI(router, fullMountPath, route.routes));
    }

    return route;

  }, routes);

  return router;
}

export default {
  create: createRouter,
  createAPI: createAPI,
  mapMounts: mapMounts,
  mapMethods: mapMethods
};