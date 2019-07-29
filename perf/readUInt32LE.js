import { Buffer as BrowserBuffer } from '../' // (this module)

const LENGTH = 160

const browserBuffer = new BrowserBuffer(LENGTH * 4)
const typedarray = new Uint8Array(LENGTH * 4)
const dataview = new DataView(typedarray.buffer)
const nodeBuffer = new Buffer(LENGTH * 4)

;[browserBuffer, nodeBuffer].forEach(function (buf) {
  for (let i = 0; i < LENGTH; i++) {
    buf.writeUInt32LE(7000 + i, i * 4)
  }
})

for (let i = 0; i < LENGTH; i++) {
  dataview.setUint32(i * 4, 7000 + i)
}

export default (suite) => {
  suite
    .add('BrowserBuffer#readUInt32LE', function () {
      for (let i = 0; i < LENGTH; i++) {
        const x = browserBuffer.readUInt32LE(i * 4)
      }
    })
    .add('DataView#getUint32', function () {
      for (let i = 0; i < LENGTH; i++) {
        const x = dataview.getUint32(i * 4, true)
      }
    })

  if (!process.browser) suite
    .add('NodeBuffer#readUInt32LE', function () {
      for (let i = 0; i < LENGTH; i++) {
        const x = nodeBuffer.readUInt32LE(i * 4)
      }
    })
}
