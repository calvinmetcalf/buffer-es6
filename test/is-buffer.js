/* eslint-env mocha */

if (process.env.OBJECT_IMPL) global.TYPED_ARRAY_SUPPORT = false

import isBuffer from 'is-buffer'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { Buffer as B } from '../'

chai.use(chaiAsPromised)
const { assert } = chai

describe('is-buffer', function () {
  it('is-buffer tests', function () {
    assert.ok(isBuffer(new B(4)), 'new Buffer(4)')

    assert.notOk(isBuffer(undefined), 'undefined')
    assert.notOk(isBuffer(null), 'null')
    assert.notOk(isBuffer(''), 'empty string')
    assert.notOk(isBuffer(true), 'true')
    assert.notOk(isBuffer(false), 'false')
    assert.notOk(isBuffer(0), '0')
    assert.notOk(isBuffer(1), '1')
    assert.notOk(isBuffer(1.0), '1.0')
    assert.notOk(isBuffer('string'), 'string')
    assert.notOk(isBuffer({}), '{}')
    assert.notOk(isBuffer(function foo () {}), 'function foo () {}')
  })
})
