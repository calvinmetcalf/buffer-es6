/* eslint-env mocha */

if (process.env.OBJECT_IMPL) global.TYPED_ARRAY_SUPPORT = false

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { Buffer as B } from '../'

chai.use(chaiAsPromised)
const { assert } = chai

describe('static', function () {
  it('Buffer.isEncoding', function () {
    assert.strictEqual(B.isEncoding('HEX'), true)
    assert.strictEqual(B.isEncoding('hex'), true)
    assert.strictEqual(B.isEncoding('bad'), false)
  })

  it('Buffer.isBuffer', function () {
    assert.strictEqual(B.isBuffer(new B('hey', 'utf8')), true)
    assert.strictEqual(B.isBuffer(new B([1, 2, 3], 'utf8')), true)
    assert.strictEqual(B.isBuffer('hey'), false)
  })
})
