import { Buffer as BrowserBuffer } from '../' // (this module)

const LENGTH = 160

const browserBuffer = new BrowserBuffer(LENGTH * 4)
const typedarray = new Uint8Array(LENGTH * 4)
const dataview = new DataView(typedarray.buffer)
const nodeBuffer = new Buffer(LENGTH * 4)

;[browserBuffer, nodeBuffer].forEach(function (buf) {
  for (let i = 0; i < LENGTH; i++) {
    buf.writeFloatBE(97.1919 + i, i * 4)
  }
})

for (let i = 0; i < LENGTH; i++) {
  dataview.setFloat32(i * 4, 97.1919 + i)
}

export default (suite) => {
  suite
    .add('BrowserBuffer#readFloatBE', function () {
      for (let i = 0; i < LENGTH; i++) {
        const x = browserBuffer.readFloatBE(i * 4)
      }
    })
    .add('DataView#getFloat32', function () {
      for (let i = 0; i < LENGTH; i++) {
        const x = dataview.getFloat32(i * 4)
      }
    })

  if (!process.browser) suite
    .add('NodeBuffer#readFloatBE', function () {
      for (let i = 0; i < LENGTH; i++) {
        const x = nodeBuffer.readFloatBE(i * 4)
      }
    })
}
