/*global describe, expect*/

'use strict';

import routerAPI from './router-api';

describe('router-api', function () {

  let api;

  before(function() {
    api = routerAPI;
  });

  it('should create an express router', function () {

    let router = api.create();
    expect(typeof router).to.equal('function');

  });

});