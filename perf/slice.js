import { Buffer as BrowserBuffer } from '../' // (this module)

const LENGTH = 160

const browserBuffer = new BrowserBuffer(LENGTH)
const typedarray = new Uint8Array(LENGTH)
const nodeBuffer = new Buffer(LENGTH)

export default (suite) => {
  suite
    .add('BrowserBuffer#slice', function () {
      browserBuffer.slice(4)
    })
    .add('Uint8Array#subarray', function () {
      typedarray.subarray(4)
    })

  if (!process.browser) suite
    .add('NodeBuffer#slice', function () {
      nodeBuffer.slice(4)
    })
}
