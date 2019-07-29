/* eslint-env mocha */

if (process.env.OBJECT_IMPL) global.TYPED_ARRAY_SUPPORT = false

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { Buffer as B } from '../'

chai.use(chaiAsPromised)
const { assert } = chai

describe('slice', function () {
  it('modifying buffer created by .slice() modifies original memory', function () {
    if (!B.TYPED_ARRAY_SUPPORT) return

    const buf1 = new B(26)
    for (let i = 0; i < 26; i++) {
      buf1[i] = i + 97 // 97 is ASCII a
    }

    const buf2 = buf1.slice(0, 3)
    assert.strictEqual(buf2.toString('ascii', 0, buf2.length), 'abc')

    buf2[0] = '!'.charCodeAt(0)
    assert.strictEqual(buf1.toString('ascii', 0, buf2.length), '!bc')
  })

  it('modifying parent buffer modifies .slice() buffer\'s memory', function () {
    if (!B.TYPED_ARRAY_SUPPORT) return

    const buf1 = new B(26)
    for (let i = 0; i < 26; i++) {
      buf1[i] = i + 97 // 97 is ASCII a
    }

    const buf2 = buf1.slice(0, 3)
    assert.strictEqual(buf2.toString('ascii', 0, buf2.length), 'abc')

    buf1[0] = '!'.charCodeAt(0)
    assert.strictEqual(buf2.toString('ascii', 0, buf2.length), '!bc')
  })
})
