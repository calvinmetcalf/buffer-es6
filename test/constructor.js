/* eslint-env mocha */

if (process.env.OBJECT_IMPL) global.TYPED_ARRAY_SUPPORT = false

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { Buffer as B } from '../'

chai.use(chaiAsPromised)
const { assert } = chai

describe('constructor', function () {
  it('new buffer from array', function () {
    assert.equal(
      new B([1, 2, 3]).toString(),
      '\u0001\u0002\u0003'
    )
  })

  it('new buffer from array w/ negatives', function () {
    assert.equal(
      new B([-1, -2, -3]).toString('hex'),
      'fffefd'
    )
  })

  it('new buffer from array with mixed signed input', function () {
    assert.equal(
      new B([-255, 255, -128, 128, 512, -512, 511, -511]).toString('hex'),
      '01ff80800000ff01'
    )
  })

  it('new buffer from string', function () {
    assert.equal(
      new B('hey', 'utf8').toString(),
      'hey'
    )
  })

  it('new buffer from buffer', function () {
    const b1 = new B('asdf')
    const b2 = new B(b1)
    assert.equal(b1.toString('hex'), b2.toString('hex'))
  })

  it('new buffer from ArrayBuffer', function () {
    if (typeof ArrayBuffer !== 'undefined') {
      const arraybuffer = new Uint8Array([0, 1, 2, 3]).buffer
      const b = new B(arraybuffer)
      assert.equal(b.length, 4)
      assert.equal(b[0], 0)
      assert.equal(b[1], 1)
      assert.equal(b[2], 2)
      assert.equal(b[3], 3)
      assert.equal(b[4], undefined)
    }
  })

  it('new buffer from ArrayBuffer, shares memory', function () {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      const u = new Uint8Array([0, 1, 2, 3])
      const arraybuffer = u.buffer
      const b = new B(arraybuffer)
      assert.equal(b.length, 4)
      assert.equal(b[0], 0)
      assert.equal(b[1], 1)
      assert.equal(b[2], 2)
      assert.equal(b[3], 3)
      assert.equal(b[4], undefined)

      // changing the Uint8Array (and thus the ArrayBuffer), changes the Buffer
      u[0] = 10
      assert.equal(b[0], 10)
      u[1] = 11
      assert.equal(b[1], 11)
      u[2] = 12
      assert.equal(b[2], 12)
      u[3] = 13
      assert.equal(b[3], 13)
    }
  })

  it('new buffer from Uint8Array', function () {
    if (typeof Uint8Array !== 'undefined') {
      const b1 = new Uint8Array([0, 1, 2, 3])
      const b2 = new B(b1)
      assert.equal(b1.length, b2.length)
      assert.equal(b1[0], 0)
      assert.equal(b1[1], 1)
      assert.equal(b1[2], 2)
      assert.equal(b1[3], 3)
      assert.equal(b1[4], undefined)
    }
  })

  it('new buffer from Uint16Array', function () {
    if (typeof Uint16Array !== 'undefined') {
      const b1 = new Uint16Array([0, 1, 2, 3])
      const b2 = new B(b1)
      assert.equal(b1.length, b2.length)
      assert.equal(b1[0], 0)
      assert.equal(b1[1], 1)
      assert.equal(b1[2], 2)
      assert.equal(b1[3], 3)
      assert.equal(b1[4], undefined)
    }
  })

  it('new buffer from Uint32Array', function () {
    if (typeof Uint32Array !== 'undefined') {
      const b1 = new Uint32Array([0, 1, 2, 3])
      const b2 = new B(b1)
      assert.equal(b1.length, b2.length)
      assert.equal(b1[0], 0)
      assert.equal(b1[1], 1)
      assert.equal(b1[2], 2)
      assert.equal(b1[3], 3)
      assert.equal(b1[4], undefined)
    }
  })

  it('new buffer from Int16Array', function () {
    if (typeof Int16Array !== 'undefined') {
      const b1 = new Int16Array([0, 1, 2, 3])
      const b2 = new B(b1)
      assert.equal(b1.length, b2.length)
      assert.equal(b1[0], 0)
      assert.equal(b1[1], 1)
      assert.equal(b1[2], 2)
      assert.equal(b1[3], 3)
      assert.equal(b1[4], undefined)
    }
  })

  it('new buffer from Int32Array', function () {
    if (typeof Int32Array !== 'undefined') {
      const b1 = new Int32Array([0, 1, 2, 3])
      const b2 = new B(b1)
      assert.equal(b1.length, b2.length)
      assert.equal(b1[0], 0)
      assert.equal(b1[1], 1)
      assert.equal(b1[2], 2)
      assert.equal(b1[3], 3)
      assert.equal(b1[4], undefined)
    }
  })

  it('new buffer from Float32Array', function () {
    if (typeof Float32Array !== 'undefined') {
      const b1 = new Float32Array([0, 1, 2, 3])
      const b2 = new B(b1)
      assert.equal(b1.length, b2.length)
      assert.equal(b1[0], 0)
      assert.equal(b1[1], 1)
      assert.equal(b1[2], 2)
      assert.equal(b1[3], 3)
      assert.equal(b1[4], undefined)
    }
  })

  it('new buffer from Float64Array', function () {
    if (typeof Float64Array !== 'undefined') {
      const b1 = new Float64Array([0, 1, 2, 3])
      const b2 = new B(b1)
      assert.equal(b1.length, b2.length)
      assert.equal(b1[0], 0)
      assert.equal(b1[1], 1)
      assert.equal(b1[2], 2)
      assert.equal(b1[3], 3)
      assert.equal(b1[4], undefined)
    }
  })

  it('new buffer from buffer.toJSON() output', function () {
    if (typeof JSON === 'undefined') {
      // ie6, ie7 lack support
      return
    }
    const buf = new B('it')
    const json = JSON.stringify(buf)
    const obj = JSON.parse(json)
    const copy = new B(obj)
    assert.isOk(buf.equals(copy))
  })
})
