/* eslint-env mocha */

if (process.env.OBJECT_IMPL) global.TYPED_ARRAY_SUPPORT = false

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { Buffer as B } from '../'

chai.use(chaiAsPromised)
const { assert, expect } = chai

describe('write infinity', function () {
  it('write/read Infinity as a float', function () {
    const buf = new B(4)
    assert.strictEqual(buf.writeFloatBE(Infinity, 0), 4)
    assert.strictEqual(buf.readFloatBE(0), Infinity)
  })

  it('write/read -Infinity as a float', function () {
    const buf = new B(4)
    assert.strictEqual(buf.writeFloatBE(-Infinity, 0), 4)
    assert.strictEqual(buf.readFloatBE(0), -Infinity)
  })

  it('write/read Infinity as a double', function () {
    const buf = new B(8)
    assert.strictEqual(buf.writeDoubleBE(Infinity, 0), 8)
    assert.strictEqual(buf.readDoubleBE(0), Infinity)
  })

  it('write/read -Infinity as a double', function () {
    const buf = new B(8)
    assert.strictEqual(buf.writeDoubleBE(-Infinity, 0), 8)
    assert.strictEqual(buf.readDoubleBE(0), -Infinity)
  })

  it('write/read float greater than max', function () {
    const buf = new B(4)
    assert.strictEqual(buf.writeFloatBE(4e38, 0), 4)
    assert.strictEqual(buf.readFloatBE(0), Infinity)
  })

  it('write/read float less than min', function () {
    const buf = new B(4)
    assert.strictEqual(buf.writeFloatBE(-4e40, 0), 4)
    assert.strictEqual(buf.readFloatBE(0), -Infinity)
  })
})
