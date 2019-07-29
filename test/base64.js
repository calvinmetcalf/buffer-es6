/* eslint-env mocha */

if (process.env.OBJECT_IMPL) global.TYPED_ARRAY_SUPPORT = false

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { Buffer as B } from '../'

chai.use(chaiAsPromised)
const { assert } = chai

describe('base64', function () {
  it('base64: ignore whitespace', function () {
    const text = '\n   YW9ldQ==  '
    const buf = new B(text, 'base64')
    assert.strictEqual(buf.toString(), 'aoeu')
  })

  it('base64: strings without padding', function () {
    assert.strictEqual((new B('YW9ldQ', 'base64').toString()), 'aoeu')
  })

  it('base64: newline in utf8 -- should not be an issue', function () {
    assert.strictEqual(
      new B('LS0tCnRpdGxlOiBUaHJlZSBkYXNoZXMgbWFya3MgdGhlIHNwb3QKdGFnczoK', 'base64').toString('utf8'),
      '---\ntitle: Three dashes marks the spot\ntags:\n'
    )
  })

  it('base64: newline in base64 -- should get stripped', function () {
    assert.strictEqual(
      new B('LS0tCnRpdGxlOiBUaHJlZSBkYXNoZXMgbWFya3MgdGhlIHNwb3QKdGFnczoK\nICAtIHlhbWwKICAtIGZyb250LW1hdHRlcgogIC0gZGFzaGVzCmV4cGFuZWQt', 'base64').toString('utf8'),
      '---\ntitle: Three dashes marks the spot\ntags:\n  - yaml\n  - front-matter\n  - dashes\nexpaned-'
    )
  })

  it('base64: tab characters in base64 - should get stripped', function () {
    assert.strictEqual(
      new B('LS0tCnRpdGxlOiBUaHJlZSBkYXNoZXMgbWFya3MgdGhlIHNwb3QKdGFnczoK\t\t\t\tICAtIHlhbWwKICAtIGZyb250LW1hdHRlcgogIC0gZGFzaGVzCmV4cGFuZWQt', 'base64').toString('utf8'),
      '---\ntitle: Three dashes marks the spot\ntags:\n  - yaml\n  - front-matter\n  - dashes\nexpaned-'
    )
  })

  it('base64: invalid non-alphanumeric characters -- should be stripped', function () {
    assert.strictEqual(
      new B('!"#$%&\'()*,.:;<=>?@[\\]^`{|}~', 'base64').toString('utf8'),
      ''
    )
  })
})
