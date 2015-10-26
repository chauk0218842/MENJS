'use strict';

import routerAPI from './lib/router/router-api';
import routesAPI from './routes/routes-api';
import mwAPI from './middleware/middleware-api';

/**
 * Create router API
 * @param rootMountPath
 * @param routes
 * @returns {*}
 */

//TODO should re-consider how this is instantiated
function createRouter(rootMountPath, routes) {

  routerAPI.mapMounts(function mapMountsHandler (route, mountPath, mount) {
    if (route.methods) {
      routerAPI.mapMethods(function (method) {
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
      }, mountPath, mount, route.methods);
    }

    if (route.routes) {
      route.routes = routerAPI.mapMounts(mapMountsHandler, route.routes);
    }

    return route;

  }, routes);

  return routerAPI.mapRoutes(routerAPI.create(null), rootMountPath, routes);
}

export default createRouter('/api', routesAPI);