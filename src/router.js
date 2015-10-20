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
        if (method.security) {
          mw = mw.concat (mwAPI.createUserPrivileges(method.security));
        }

        return mw.concat(method.callbacks)
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