/* eslint-env mocha */

if (process.env.OBJECT_IMPL) global.TYPED_ARRAY_SUPPORT = false

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { Buffer as B } from '../'

chai.use(chaiAsPromised)
const { assert } = chai

describe('basic', function () {
  it('instanceof Buffer', function () {
    const buf = new B([1, 2])
    assert.ok(buf instanceof B)
  })

  it('convert to Uint8Array in modern browsers', function () {
    if (B.TYPED_ARRAY_SUPPORT) {
      const buf = new B([1, 2])
      const uint8array = new Uint8Array(buf.buffer)
      assert.ok(uint8array instanceof Uint8Array)
      assert.strictEqual(uint8array[0], 1)
      assert.strictEqual(uint8array[1], 2)
    } else {
      assert.pass('object impl: skipping it')
    }
  })

  it('indexes from a string', function () {
    const buf = new B('abc')
    assert.strictEqual(buf[0], 97)
    assert.strictEqual(buf[1], 98)
    assert.strictEqual(buf[2], 99)
  })

  it('indexes from an array', function () {
    const buf = new B([97, 98, 99])
    assert.strictEqual(buf[0], 97)
    assert.strictEqual(buf[1], 98)
    assert.strictEqual(buf[2], 99)
  })

  it('setting index value should modify buffer contents', function () {
    const buf = new B([97, 98, 99])
    assert.strictEqual(buf[2], 99)
    assert.strictEqual(buf.toString(), 'abc')

    buf[2] += 10
    assert.strictEqual(buf[2], 109)
    assert.strictEqual(buf.toString(), 'abm')
  })

  it('storing negative number should cast to unsigned', function () {
    let buf = new B(1)

    if (B.TYPED_ARRAY_SUPPORT) {
      // This does not work with the object implementation -- nothing we can do!
      buf[0] = -3
      assert.strictEqual(buf[0], 253)
    }

    buf = new B(1)
    buf.writeInt8(-3, 0)
    assert.strictEqual(buf[0], 253)
  })

  it('it that memory is copied from array-like', function () {
    if (!B.TYPED_ARRAY_SUPPORT) return

    const u = new Uint8Array(4)
    const b = new B(u)
    b[0] = 1
    b[1] = 2
    b[2] = 3
    b[3] = 4

    assert.strictEqual(u[0], 0)
    assert.strictEqual(u[1], 0)
    assert.strictEqual(u[2], 0)
    assert.strictEqual(u[3], 0)
  })
})
