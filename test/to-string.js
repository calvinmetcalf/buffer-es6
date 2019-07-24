/* eslint-env mocha */

if (process.env.OBJECT_IMPL) global.TYPED_ARRAY_SUPPORT = false

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { Buffer as B } from '../'

chai.use(chaiAsPromised)
const { assert } = chai

describe('to-string', function () {
  it('utf8 buffer to base64', function () {
    assert.strictEqual(
      new B('Ձאab', 'utf8').toString('base64'),
      '1YHXkGFi'
    )
  })

  it('utf8 to utf8', function () {
    assert.strictEqual(
      new B('öäüõÖÄÜÕ', 'utf8').toString('utf8'),
      'öäüõÖÄÜÕ'
    )
  })

  it('utf16le to utf16', function () {
    assert.strictEqual(
      new B(new B('abcd', 'utf8').toString('utf16le'), 'utf16le').toString('utf8'),
      'abcd'
    )
  })

  it('utf16le to hex', function () {
    assert.strictEqual(
      new B('abcd', 'utf16le').toString('hex'),
      '6100620063006400'
    )
  })

  it('ascii buffer to base64', function () {
    assert.strictEqual(
      new B('123456!@#$%^', 'ascii').toString('base64'),
      'MTIzNDU2IUAjJCVe'
    )
  })

  it('ascii buffer to hex', function () {
    assert.strictEqual(
      new B('123456!@#$%^', 'ascii').toString('hex'),
      '31323334353621402324255e'
    )
  })

  it('base64 buffer to utf8', function () {
    assert.strictEqual(
      new B('1YHXkGFi', 'base64').toString('utf8'),
      'Ձאab'
    )
  })

  it('hex buffer to utf8', function () {
    assert.strictEqual(
      new B('d581d7906162', 'hex').toString('utf8'),
      'Ձאab'
    )
  })

  it('base64 buffer to ascii', function () {
    assert.strictEqual(
      new B('MTIzNDU2IUAjJCVe', 'base64').toString('ascii'),
      '123456!@#$%^'
    )
  })

  it('hex buffer to ascii', function () {
    assert.strictEqual(
      new B('31323334353621402324255e', 'hex').toString('ascii'),
      '123456!@#$%^'
    )
  })

  it('base64 buffer to binary', function () {
    assert.strictEqual(
      new B('MTIzNDU2IUAjJCVe', 'base64').toString('binary'),
      '123456!@#$%^'
    )
  })

  it('hex buffer to binary', function () {
    assert.strictEqual(
      new B('31323334353621402324255e', 'hex').toString('binary'),
      '123456!@#$%^'
    )
  })

  it('hex buffer to binary with start and end', function () {
    assert.strictEqual(
      new B('31323334353621402324255e', 'hex').toString('binary', 1, 5),
      '2345'
    )
  })


  it('utf8 to binary', function () {
    /* jshint -W100 */
    assert.strictEqual(
      new B('öäüõÖÄÜÕ', 'utf8').toString('binary'),
      'Ã¶Ã¤Ã¼ÃµÃÃÃÃ'
    )
    /* jshint +W100 */
  })

  it('utf8 replacement chars (1 byte sequence)', function () {
    assert.strictEqual(
      new B([0x80]).toString(),
      '\uFFFD'
    )
    assert.strictEqual(
      new B([0x7F]).toString(),
      '\u007F'
    )
  })

  it('utf8 replacement chars (2 byte sequences)', function () {
    assert.strictEqual(
      new B([0xC7]).toString(),
      '\uFFFD'
    )
    assert.strictEqual(
      new B([0xC7, 0xB1]).toString(),
      '\u01F1'
    )
    assert.strictEqual(
      new B([0xC0, 0xB1]).toString(),
      '\uFFFD\uFFFD'
    )
    assert.strictEqual(
      new B([0xC1, 0xB1]).toString(),
      '\uFFFD\uFFFD'
    )
  })

  it('utf8 replacement chars (3 byte sequences)', function () {
    assert.strictEqual(
      new B([0xE0]).toString(),
      '\uFFFD'
    )
    assert.strictEqual(
      new B([0xE0, 0xAC]).toString(),
      '\uFFFD\uFFFD'
    )
    assert.strictEqual(
      new B([0xE0, 0xAC, 0xB9]).toString(),
      '\u0B39'
    )
  })

  it('utf8 replacement chars (4 byte sequences)', function () {
    assert.strictEqual(
      new B([0xF4]).toString(),
      '\uFFFD'
    )
    assert.strictEqual(
      new B([0xF4, 0x8F]).toString(),
      '\uFFFD\uFFFD'
    )
    assert.strictEqual(
      new B([0xF4, 0x8F, 0x80]).toString(),
      '\uFFFD\uFFFD\uFFFD'
    )
    assert.strictEqual(
      new B([0xF4, 0x8F, 0x80, 0x84]).toString(),
      '\uDBFC\uDC04'
    )
    assert.strictEqual(
      new B([0xFF]).toString(),
      '\uFFFD'
    )
    assert.strictEqual(
      new B([0xFF, 0x8F, 0x80, 0x84]).toString(),
      '\uFFFD\uFFFD\uFFFD\uFFFD'
    )
  })

  it('utf8 replacement chars on 256 random bytes', function () {
    assert.strictEqual(
      new B([152, 130, 206, 23, 243, 238, 197, 44, 27, 86, 208, 36, 163, 184, 164, 21, 94, 242, 178, 46, 25, 26, 253, 178, 72, 147, 207, 112, 236, 68, 179, 190, 29, 83, 239, 147, 125, 55, 143, 19, 157, 68, 157, 58, 212, 224, 150, 39, 128, 24, 94, 225, 120, 121, 75, 192, 112, 19, 184, 142, 203, 36, 43, 85, 26, 147, 227, 139, 242, 186, 57, 78, 11, 102, 136, 117, 180, 210, 241, 92, 3, 215, 54, 167, 249, 1, 44, 225, 146, 86, 2, 42, 68, 21, 47, 238, 204, 153, 216, 252, 183, 66, 222, 255, 15, 202, 16, 51, 134, 1, 17, 19, 209, 76, 238, 38, 76, 19, 7, 103, 249, 5, 107, 137, 64, 62, 170, 57, 16, 85, 179, 193, 97, 86, 166, 196, 36, 148, 138, 193, 210, 69, 187, 38, 242, 97, 195, 219, 252, 244, 38, 1, 197, 18, 31, 246, 53, 47, 134, 52, 105, 72, 43, 239, 128, 203, 73, 93, 199, 75, 222, 220, 166, 34, 63, 236, 11, 212, 76, 243, 171, 110, 78, 39, 205, 204, 6, 177, 233, 212, 243, 0, 33, 41, 122, 118, 92, 252, 0, 157, 108, 120, 70, 137, 100, 223, 243, 171, 232, 66, 126, 111, 142, 33, 3, 39, 117, 27, 107, 54, 1, 217, 227, 132, 13, 166, 3, 73, 53, 127, 225, 236, 134, 219, 98, 214, 125, 148, 24, 64, 142, 111, 231, 194, 42, 150, 185, 10, 182, 163, 244, 19, 4, 59, 135, 16]).toString(),
      '\uFFFD\uFFFD\uFFFD\u0017\uFFFD\uFFFD\uFFFD\u002C\u001B\u0056\uFFFD\u0024\uFFFD\uFFFD\uFFFD\u0015\u005E\uFFFD\uFFFD\u002E\u0019\u001A\uFFFD\uFFFD\u0048\uFFFD\uFFFD\u0070\uFFFD\u0044\uFFFD\uFFFD\u001D\u0053\uFFFD\uFFFD\u007D\u0037\uFFFD\u0013\uFFFD\u0044\uFFFD\u003A\uFFFD\uFFFD\uFFFD\u0027\uFFFD\u0018\u005E\uFFFD\u0078\u0079\u004B\uFFFD\u0070\u0013\uFFFD\uFFFD\uFFFD\u0024\u002B\u0055\u001A\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u0039\u004E\u000B\u0066\uFFFD\u0075\uFFFD\uFFFD\uFFFD\u005C\u0003\uFFFD\u0036\uFFFD\uFFFD\u0001\u002C\uFFFD\uFFFD\u0056\u0002\u002A\u0044\u0015\u002F\uFFFD\u0319\uFFFD\uFFFD\uFFFD\u0042\uFFFD\uFFFD\u000F\uFFFD\u0010\u0033\uFFFD\u0001\u0011\u0013\uFFFD\u004C\uFFFD\u0026\u004C\u0013\u0007\u0067\uFFFD\u0005\u006B\uFFFD\u0040\u003E\uFFFD\u0039\u0010\u0055\uFFFD\uFFFD\u0061\u0056\uFFFD\uFFFD\u0024\uFFFD\uFFFD\uFFFD\uFFFD\u0045\uFFFD\u0026\uFFFD\u0061\uFFFD\uFFFD\uFFFD\uFFFD\u0026\u0001\uFFFD\u0012\u001F\uFFFD\u0035\u002F\uFFFD\u0034\u0069\u0048\u002B\uFFFD\uFFFD\uFFFD\u0049\u005D\uFFFD\u004B\uFFFD\u0726\u0022\u003F\uFFFD\u000B\uFFFD\u004C\uFFFD\uFFFD\u006E\u004E\u0027\uFFFD\uFFFD\u0006\uFFFD\uFFFD\uFFFD\uFFFD\u0000\u0021\u0029\u007A\u0076\u005C\uFFFD\u0000\uFFFD\u006C\u0078\u0046\uFFFD\u0064\uFFFD\uFFFD\uFFFD\uFFFD\u0042\u007E\u006F\uFFFD\u0021\u0003\u0027\u0075\u001B\u006B\u0036\u0001\uFFFD\uFFFD\uFFFD\u000D\uFFFD\u0003\u0049\u0035\u007F\uFFFD\uFFFD\uFFFD\uFFFD\u0062\uFFFD\u007D\uFFFD\u0018\u0040\uFFFD\u006F\uFFFD\uFFFD\u002A\uFFFD\uFFFD\u000A\uFFFD\uFFFD\uFFFD\u0013\u0004\u003B\uFFFD\u0010'
    )
  })

  it('utf8 replacement chars for anything in the surrogate pair range', function () {
    assert.strictEqual(
      new B([0xED, 0x9F, 0xBF]).toString(),
      '\uD7FF'
    )
    assert.strictEqual(
      new B([0xED, 0xA0, 0x80]).toString(),
      '\uFFFD\uFFFD\uFFFD'
    )
    assert.strictEqual(
      new B([0xED, 0xBE, 0x8B]).toString(),
      '\uFFFD\uFFFD\uFFFD'
    )
    assert.strictEqual(
      new B([0xED, 0xBF, 0xBF]).toString(),
      '\uFFFD\uFFFD\uFFFD'
    )
    assert.strictEqual(
      new B([0xEE, 0x80, 0x80]).toString(),
      '\uE000'
    )
  })

  it('utf8 don\'t replace the replacement char', function () {
    assert.strictEqual(
      new B('\uFFFD').toString(),
      '\uFFFD'
    )
  })
})