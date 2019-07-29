/* eslint-env mocha */

if (process.env.OBJECT_IMPL) global.TYPED_ARRAY_SUPPORT = false

import isnan from 'is-nan'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { Buffer as B } from '../'

chai.use(chaiAsPromised)
const { assert, expect } = chai


describe('write infinity', function () {
  it('buffer.write string should get parsed as number', function () {
    const b = new B(64)
    b.writeUInt16LE('1003', 0)
    assert.strictEqual(b.readUInt16LE(0), 1003)
  })

  it('buffer.writeUInt8 a fractional number will get Math.floored', function () {
    // Some extra work is necessary to make this it pass with the Object implementation

    const b = new B(1)
    b.writeInt8(5.5, 0)
    assert.strictEqual(b[0], 5)
  })

  it('writeUint8 with a negative number throws', function () {
    const buf = new B(1)

    expect(function () {
      buf.writeUInt8(-3, 0)
    }).to.throw(Error)
  })

  it('hex of write{Uint,Int}{8,16,32}{LE,BE}', function () {
    const hex = [
      '03', '0300', '0003', '03000000', '00000003',
      'fd', 'fdff', 'fffd', 'fdffffff', 'fffffffd'
    ]
    const reads = [3, 3, 3, 3, 3, -3, -3, -3, -3, -3]
    const xs = ['UInt', 'Int']
    const ys = [8, 16, 32]
    for (let i = 0; i < xs.length; i++) {
      const x = xs[i]
      for (let j = 0; j < ys.length; j++) {
        const y = ys[j]
        const endianesses = (y === 8) ? [''] : ['LE', 'BE']
        for (let k = 0; k < endianesses.length; k++) {
          const z = endianesses[k]

          const v1 = new B(y / 8)
          const writefn = 'write' + x + y + z
          const val = (x === 'Int') ? -3 : 3
          v1[writefn](val, 0)
          assert.strictEqual(
            v1.toString('hex'),
            hex.shift()
          )
          const readfn = 'read' + x + y + z
          assert.strictEqual(
            v1[readfn](0),
            reads.shift()
          )
        }
      }
    }
  })

  it('hex of write{Uint,Int}{8,16,32}{LE,BE} with overflow', function () {
    if (!B.TYPED_ARRAY_SUPPORT) {
      console.log('object impl: skipping overflow it')
      return
    }

    const hex = [
      '', '03', '00', '030000', '000000',
      '', 'fd', 'ff', 'fdffff', 'ffffff'
    ]
    const reads = [
      undefined, 3, 0, NaN, 0,
      undefined, 253, -256, 16777213, -256
    ]
    const xs = ['UInt', 'Int']
    const ys = [8, 16, 32]
    for (let i = 0; i < xs.length; i++) {
      const x = xs[i]
      for (let j = 0; j < ys.length; j++) {
        const y = ys[j]
        const endianesses = (y === 8) ? [''] : ['LE', 'BE']
        for (let k = 0; k < endianesses.length; k++) {
          const z = endianesses[k]

          const v1 = new B(y / 8 - 1)
          const next = new B(4)
          next.writeUInt32BE(0, 0)
          const writefn = 'write' + x + y + z
          const val = (x === 'Int') ? -3 : 3
          v1[writefn](val, 0, true)
          assert.strictEqual(
            v1.toString('hex'),
            hex.shift()
          )
          // check that nothing leaked to next buffer.
          assert.strictEqual(next.readUInt32BE(0), 0)
          // check that no bytes are read from next buffer.
          next.writeInt32BE(~0, 0)
          const readfn = 'read' + x + y + z
          const r = reads.shift()

          if (!isnan(r)) assert.strictEqual(v1[readfn](0, true), r)
        }
      }
    }
  })

  it('large values do not improperly roll over (ref #80)', function () {
    const nums = [-25589992, -633756690, -898146932]
    const out = new B(12)
    out.fill(0)
    out.writeInt32BE(nums[0], 0)
    let newNum = out.readInt32BE(0)
    assert.strictEqual(nums[0], newNum)
    out.writeInt32BE(nums[1], 4)
    newNum = out.readInt32BE(4)
    assert.strictEqual(nums[1], newNum)
    out.writeInt32BE(nums[2], 8)
    newNum = out.readInt32BE(8)
    assert.strictEqual(nums[2], newNum)
  })
})
