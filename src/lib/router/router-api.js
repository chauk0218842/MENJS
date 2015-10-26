'use strict';

import express from 'express';

let createRouter = express.Router;

/**
 * Map router mounts helper util
 * @param handler
 * @param mounts
 * @returns {*}
 */
function mapMounts(handler, mounts) {
  Object.keys(mounts).forEach(mountPath => {
    mounts[mountPath] = handler(mounts[mountPath], mountPath, mounts);
  });

  return mounts;
}

/**
 * Map mounts' methods helper util
 * @param handler
 * @param methods
 * @param mountPath
 * @param mount
 * @returns {*}
 */
function mapMethods(handler, mountPath, mount, methods) {
  Object.keys(methods).forEach(type => {
    methods[type] = handler(methods[type], type, mountPath, mount);
  });

  return methods;
}

/**
 * Map routes method helper util
 * @param router
 * @param rootMountPath
 * @param routes
 * @returns {*}
 */
function mapRoutes(router, rootMountPath, routes) {

  rootMountPath = rootMountPath || '';
  mapMounts(function (route, mountPath, mount) {

    if (route.methods) {
      mapMethods(function (method, type, mountPath) {
        let fullMountPath = (rootMountPath + '/' + mountPath).replace(/\/\//g, '/');
        router[type](fullMountPath, method);
        console.log('Created mount ' + type + ' ' + fullMountPath);

        return method;
      }, mountPath, mount, route.methods);
    }

    if (route.routes) {
      let fullMountPath = (rootMountPath + '/' + mountPath).replace(/\/\//g, '/');
      router.use(fullMountPath, mapRoutes(router, fullMountPath, route.routes));
    }

    return route;

  }, routes);

  return router;
}

export default {
  create: createRouter,
  mapRoutes: mapRoutes,
  mapMounts: mapMounts,
  mapMethods: mapMethods
};