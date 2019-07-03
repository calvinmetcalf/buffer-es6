var BrowserBuffer = require('../').Buffer // (this module)
var util = require('./util')
var suite = util.suite()

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

var array = []
for (var i = 0; i < 250; i++) {
  array.push(getRandomArbitrary(0, 256))
}

var browserBuffer = new BrowserBuffer(array)
var nodeBuffer = new Buffer(array)

const foo = function () {return 'bar'}
function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return foo(this, start, end)

      case 'utf8':
      case 'utf-8':
        return foo(this, start, end)

      case 'ascii':
        return foo(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return foo(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return foo(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}


function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

suite
  .add('BrowserBuffer#readBinary', function () {
    browserBuffer.toString('binary')
  })
  .add('OldBrowserBuffer#readBinary', function () {
    slowToString.apply(browserBuffer, ['binary'])
  })

if (!process.browser) suite
  .add('NodeBuffer#readBinary', function () {
    nodeBuffer.toString('binary')
  })
