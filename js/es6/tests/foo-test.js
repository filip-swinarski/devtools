'use strict';

import * as mocha from 'mocha';
import * as chai from 'chai';
import {foo} from '../modules/foo.js';

let assert = chai.assert;
let expect = chai.expect;
let should = chai.should();
let n = 6;

describe('foo function', () => {
    
    // assert api
    it('Return value shouldn\'t be undefined', () => {
        assert(foo(n) !== undefined, 'foo(n) does not return undefined')
    });

});
