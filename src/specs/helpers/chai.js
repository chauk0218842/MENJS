/*global global*/
'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.config.includeStack = true;

global.expect = chai.expect;
global.sinon = sinon;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;