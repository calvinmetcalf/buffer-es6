import { Buffer as BrowserBuffer } from '../' // (this module)

const LENGTH = 160

const browserBuffer = new BrowserBuffer(LENGTH * 8)
const typedarray = new Uint8Array(LENGTH * 8)
const dataview = new DataView(typedarray.buffer)
const nodeBuffer = new Buffer(LENGTH * 8)

;[browserBuffer, nodeBuffer].forEach(function (buf) {
  for (let i = 0; i < LENGTH; i++) {
    buf.writeDoubleBE(97.1919 + i, i * 8)
  }
})

for (let i = 0; i < LENGTH; i++) {
  dataview.setFloat64(i * 8, 97.1919 + i)
}

export default (suite) => {
  suite
    .add('BrowserBuffer#readDoubleBE', function () {
      for (let i = 0; i < LENGTH; i++) {
        const x = browserBuffer.readDoubleBE(i * 8)
      }
    })
    .add('DataView#getFloat64', function () {
      for (let i = 0; i < LENGTH; i++) {
        const x = dataview.getFloat64(i * 8)
      }
    })

  if (!process.browser) suite
    .add('NodeBuffer#readDoubleBE', function () {
      for (let i = 0; i < LENGTH; i++) {
        const x = nodeBuffer.readDoubleBE(i * 8)
      }
    })
}
