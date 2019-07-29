/* eslint-env mocha */

if (process.env.OBJECT_IMPL) global.TYPED_ARRAY_SUPPORT = false

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { Buffer as B } from '../'

chai.use(chaiAsPromised)
const { assert } = chai

describe('methods', function () {
  it('buffer.toJSON', function () {
    const data = [1, 2, 3, 4]
    assert.deepEqual(
      new B(data).toJSON(),
      { type: 'Buffer', data: [1, 2, 3, 4] }
    )
  })

  it('buffer.copy', function () {
    // copied from nodejs.org example
    const buf1 = new B(26)
    const buf2 = new B(26)

    for (let i = 0; i < 26; i++) {
      buf1[i] = i + 97 // 97 is ASCII a
      buf2[i] = 33 // ASCII !
    }

    buf1.copy(buf2, 8, 16, 20)

    assert.strictEqual(
      buf2.toString('ascii', 0, 25),
      '!!!!!!!!qrst!!!!!!!!!!!!!'
    )
  })

  it('it offset returns are correct', function () {
    const b = new B(16)
    assert.strictEqual(4, b.writeUInt32LE(0, 0))
    assert.strictEqual(6, b.writeUInt16LE(0, 4))
    assert.strictEqual(7, b.writeUInt8(0, 6))
    assert.strictEqual(8, b.writeInt8(0, 7))
    assert.strictEqual(16, b.writeDoubleLE(0, 8))
  })

  it('concat() a constying number of buffers', function () {
    const zero = []
    const one = [new B('asdf')]
    const long = []
    for (let i = 0; i < 10; i++) {
      long.push(new B('asdf'))
    }

    const flatZero = B.concat(zero)
    const flatOne = B.concat(one)
    const flatLong = B.concat(long)
    const flatLongLen = B.concat(long, 40)

    assert.strictEqual(flatZero.length, 0)
    assert.strictEqual(flatOne.toString(), 'asdf')
    assert.deepEqual(flatOne, one[0])
    assert.strictEqual(flatLong.toString(), (new Array(10 + 1).join('asdf')))
    assert.strictEqual(flatLongLen.toString(), (new Array(10 + 1).join('asdf')))
  })

  it('fill', function () {
    const b = new B(10)
    b.fill(2)
    assert.strictEqual(b.toString('hex'), '02020202020202020202')
  })

  it('fill (string)', function () {
    const b = new B(10)
    b.fill('abc')
    assert.strictEqual(b.toString(), 'abcabcabca')
    b.fill('է')
    assert.strictEqual(b.toString(), 'էէէէէ')
  })

  it('copy() empty buffer with sourceEnd=0', function () {
    const source = new B([42])
    const destination = new B([43])
    source.copy(destination, 0, 0, 0)
    assert.strictEqual(destination.readUInt8(0), 43)
  })

  it('copy() after slice()', function () {
    const source = new B(200)
    const dest = new B(200)
    const expected = new B(200)
    for (let i = 0; i < 200; i++) {
      source[i] = i
      dest[i] = 0
    }

    source.slice(2).copy(dest)
    source.copy(expected, 0, 2)
    assert.deepEqual(dest, expected)
  })

  it('copy() ascending', function () {
    const b = new B('abcdefghij')
    b.copy(b, 0, 3, 10)
    assert.strictEqual(b.toString(), 'defghijhij')
  })

  it('copy() descending', function () {
    const b = new B('abcdefghij')
    b.copy(b, 3, 0, 7)
    assert.strictEqual(b.toString(), 'abcabcdefg')
  })

  it('buffer.slice sets indexes', function () {
    assert.strictEqual((new B('hallo')).slice(0, 5).toString(), 'hallo')
  })

  it('buffer.slice out of range', function () {
    assert.strictEqual((new B('hallo')).slice(0, 10).toString(), 'hallo')
    assert.strictEqual((new B('hallo')).slice(10, 2).toString(), '')
  })
})
