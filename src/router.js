'use strict';

import router from './lib/router';
import routesAPI from './routes/routes-api';

/**
 * Create a user privileges middles
 * @param roles
 * @returns {Function}
 */
function createUserPrivilegeMiddleWare(roles) {
  return function (req, res, next) {
    next();
  };
}

/**
 * Reduce routes's middleware
 * @param cbGenerator
 * @param routes
 * @returns {*}
 */
function reduceMiddleWares(cbGenerator, routes) {

  let routesCpy = Object.assign ({}, routes);

  Object.keys(routesCpy).forEach(curMountPath => {
    Object.keys(routesCpy[curMountPath].methods).forEach(methodType => {
      let method = routes[curMountPath].methods[methodType];
      routesCpy[curMountPath].methods[methodType] = cbGenerator(method.security, method.callbacks);

      if (routesCpy[curMountPath].routes) {
        routesCpy[curMountPath].routes = reduceMiddleWares(cbGenerator, routesCpy[curMountPath].routes);
      }
    });
  });
  return routesCpy;
}

/**
 * Create router API
 * @param routes
 * @returns {*}
 */
function createRouterAPI(routes) {

  let routesCpy = reduceMiddleWares(function (userPrivileges, callbacks) {
    let middleWare = [];
    if (userPrivileges) {
      middleWare = middleWare.concat (createUserPrivilegeMiddleWare(userPrivileges));
    }

    return middleWare.concat (callbacks);
  }, routes);

  return router.createAPI (routesCpy, null);
}

export default createRouterAPI(routesAPI);