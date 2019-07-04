/* eslint-env mocha */

if (process.env.OBJECT_IMPL) global.TYPED_ARRAY_SUPPORT = false

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { Buffer as B } from '../'

chai.use(chaiAsPromised)
const { assert, expect } = chai

describe('compare', function () {
  it('buffer.compare', function () {
    const b = new B(1).fill('a')
    const c = new B(1).fill('c')
    const d = new B(2).fill('aa')

    assert.strictEqual(b.compare(c), -1)
    assert.strictEqual(c.compare(d), 1)
    assert.strictEqual(d.compare(b), 1)
    assert.strictEqual(b.compare(d), -1)

    // static method
    assert.strictEqual(B.compare(b, c), -1)
    assert.strictEqual(B.compare(c, d), 1)
    assert.strictEqual(B.compare(d, b), 1)
    assert.strictEqual(B.compare(b, d), -1)
  })

  it('buffer.compare argument validation', function () {

    expect(function () {
      const b = new B(1)
      B.compare(b, 'abc')
    }).to.throw(Error)

    expect(function () {
      const b = new B(1)
      B.compare('abc', b)
    }).to.throw(Error)

    expect(function () {
      const b = new B(1)
      b.compare('abc')
    }).to.throw(Error)
  })

  it('buffer.equals', function () {
    const b = new B(5).fill('abcdf')
    const c = new B(5).fill('abcdf')
    const d = new B(5).fill('abcde')
    const e = new B(6).fill('abcdef')

    assert.isOk(b.equals(c))
    assert.isOk(!c.equals(d))
    assert.isOk(!d.equals(e))
  })

  it('buffer.equals argument validation', function () {
    expect(function () {
      const b = new B(1)
      b.equals('abc')
    }).to.throw(Error)
  })
})
