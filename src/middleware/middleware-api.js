'use strict';

/**
 * Create a user privileges middles
 * @param roles
 * @returns {Function}
 */
function createUserPrivileges(roles) {
  return function (req, res, next) {
    next();
  };
}

/**
 * Reduce router's middleware
 * @param cbGenerator
 * @param routes
 * @returns {*}
 */
function reduceMiddleWares(cbGenerator, routes) {

  let routesCpy = Object.assign ({}, routes);

  Object.keys(routesCpy).forEach(curMountPath => {

    if (routesCpy[curMountPath].methods) {
      Object.keys(routesCpy[curMountPath].methods).forEach(methodType => {
        let method = routes[curMountPath].methods[methodType];
        routesCpy[curMountPath].methods[methodType] = cbGenerator(method.security, method.callbacks);
      });
    }

    if (routesCpy[curMountPath].routes) {
      routesCpy[curMountPath].routes = reduceMiddleWares(cbGenerator, routesCpy[curMountPath].routes);
    }

  });
  return routesCpy;
}

export default {
  createUserPrivileges: createUserPrivileges,
  reduceMiddleWares: reduceMiddleWares
};