/* eslint-env mocha */

if (process.env.OBJECT_IMPL) global.TYPED_ARRAY_SUPPORT = false

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { Buffer as B } from '../'

chai.use(chaiAsPromised)
const { assert } = chai

describe('from-string', function () {
  it('detect utf16 surrogate pairs', function () {
    const text = '\uD83D\uDE38' + '\uD83D\uDCAD' + '\uD83D\uDC4D'
    const buf = new B(text)
    assert.strictEqual(text, buf.toString())
  })

  it('detect utf16 surrogate pairs over U+20000 until U+10FFFF', function () {
    const text = '\uD842\uDFB7' + '\uD93D\uDCAD' + '\uDBFF\uDFFF'
    const buf = new B(text)
    assert.strictEqual(text, buf.toString())
  })

  it('replace orphaned utf16 surrogate lead code point', function () {
    const text = '\uD83D\uDE38' + '\uD83D' + '\uD83D\uDC4D'
    const buf = new B(text)
    assert.deepEqual(buf, new B([0xf0, 0x9f, 0x98, 0xb8, 0xef, 0xbf, 0xbd, 0xf0, 0x9f, 0x91, 0x8d]))
  })

  it('replace orphaned utf16 surrogate trail code point', function () {
    const text = '\uD83D\uDE38' + '\uDCAD' + '\uD83D\uDC4D'
    const buf = new B(text)
    assert.deepEqual(buf, new B([0xf0, 0x9f, 0x98, 0xb8, 0xef, 0xbf, 0xbd, 0xf0, 0x9f, 0x91, 0x8d]))
  })

  it('do not write partial utf16 code units', function () {
    const f = new B([0, 0, 0, 0, 0])
    assert.strictEqual(f.length, 5)
    const size = f.write('あいうえお', 'utf16le')
    assert.strictEqual(size, 4)
    assert.deepEqual(f, new B([0x42, 0x30, 0x44, 0x30, 0x00]))
  })

  it('handle partial utf16 code points when encoding to utf8 the way node does', function () {
    const text = '\uD83D\uDE38' + '\uD83D\uDC4D'

    let buf = new B(8)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0xf0, 0x9f, 0x98, 0xb8, 0xf0, 0x9f, 0x91, 0x8d]))

    buf = new B(7)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0xf0, 0x9f, 0x98, 0xb8, 0x00, 0x00, 0x00]))

    buf = new B(6)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0xf0, 0x9f, 0x98, 0xb8, 0x00, 0x00]))

    buf = new B(5)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0xf0, 0x9f, 0x98, 0xb8, 0x00]))

    buf = new B(4)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0xf0, 0x9f, 0x98, 0xb8]))

    buf = new B(3)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0x00, 0x00, 0x00]))

    buf = new B(2)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0x00, 0x00]))

    buf = new B(1)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0x00]))
  })

  it('handle invalid utf16 code points when encoding to utf8 the way node does', function () {
    const text = 'a' + '\uDE38\uD83D' + 'b'

    let buf = new B(8)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0x61, 0xef, 0xbf, 0xbd, 0xef, 0xbf, 0xbd, 0x62]))

    buf = new B(7)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0x61, 0xef, 0xbf, 0xbd, 0xef, 0xbf, 0xbd]))

    buf = new B(6)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0x61, 0xef, 0xbf, 0xbd, 0x00, 0x00]))

    buf = new B(5)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0x61, 0xef, 0xbf, 0xbd, 0x00]))

    buf = new B(4)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0x61, 0xef, 0xbf, 0xbd]))

    buf = new B(3)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0x61, 0x00, 0x00]))

    buf = new B(2)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0x61, 0x00]))

    buf = new B(1)
    buf.fill(0)
    buf.write(text)
    assert.deepEqual(buf, new B([0x61]))
  })
})
