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

  let routesCpy = mwAPI.reduceMiddleWares(function (userPrivileges, callbacks) {
    let middleWare = [];
    if (userPrivileges) {
      middleWare = middleWare.concat(mwAPI.createUserPrivileges(userPrivileges));
    }

    return middleWare.concat (callbacks);
  }, routes);

  return router.createAPI (routesCpy, rootMountPath);
}

export default createRouterAPI(routesAPI, '/api');