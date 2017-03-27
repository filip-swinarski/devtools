'use strict';

import * as mocha from 'mocha';
import * as chai from 'chai';
import {bar} from '../modules/bar.js';

let assert = chai.assert;
let expect = chai.expect;
let should = chai.should();
let n = 3;

describe('bar function', () => {
    
    // assert api
    it('Return value shouldn\'t be undefined', () => {
        assert(bar(n) !== undefined, 'bar(n) does not return undefined')
    });

});
