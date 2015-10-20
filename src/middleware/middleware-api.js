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

export default {
  createUserPrivileges: createUserPrivileges
};