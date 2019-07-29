import { Buffer as BrowserBuffer } from '../' // (this module)

const LENGTH = 9
const singleByte = 'abcdefghi'
const multiByte = '\u0610' + '\u6100' + '\uD944\uDC00'

const browserBuffer = new BrowserBuffer(LENGTH)
const nodeBuffer = new Buffer(LENGTH)

export default (suite) => {
  suite
    .add('BrowserBuffer#singleByte', function () {
      browserBuffer.write(singleByte)
    })
    .add('BrowserBuffer#multiByte', function () {
      browserBuffer.write(multiByte)
    })

  if (!process.browser) suite
    .add('NodeBuffer#singleByte', function () {
      nodeBuffer.write(singleByte)
    })
    .add('NodeBuffer#multiByte', function () {
      nodeBuffer.write(multiByte)
    })
}
