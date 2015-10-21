'use strict';

import router from './lib/router';
import routesAPI from './routes/routes-api';
import mwAPI from './middleware/middleware-api';

/**
 * Create router API
 * @param routes
 * @param rootMountPath
 * @returns {*}
 */
function createRouterAPI(routes, rootMountPath) {

  let routesCpy = router.mapMounts(function mapMountsHandler (route, mountPath, mount) {
    if (route.methods) {
      router.mapMethods(function (method) {
        let mw = [];

        if (method instanceof Array || method instanceof Function) {
          mw = mw.concat(method);
        }

        if (method.security) {
          mw = mw.concat (mwAPI.createUserPrivileges(method.security));
        }

        if (method.callbacks) {
          mw = mw.concat(method.callbacks);
        }

        return mw;
      }, route.methods, mountPath, mount);
    }

    if (route.routes) {
      route.routes = router.mapMounts(mapMountsHandler, route.routes);
    }

    return route;

  }, Object.assign ({}, routes));

  return router.createAPI(router.create(null), rootMountPath, routesCpy);
}

export default createRouterAPI(routesAPI, '/api');