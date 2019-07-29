import { Buffer as BrowserBuffer } from '../' // (this module)

const LENGTH = 160
const browserBuffer = new BrowserBuffer(LENGTH)
const browserBuffer2 = new BrowserBuffer(LENGTH)
const typedarray = new Uint8Array(LENGTH)
const typedarray2 = new Uint8Array(LENGTH)
const nodeBuffer = new Buffer(LENGTH)
const nodeBuffer2 = new Buffer(LENGTH)

;[browserBuffer, browserBuffer2, typedarray, typedarray2, nodeBuffer, nodeBuffer2].forEach((buf) => {
  for (let i = 0; i < LENGTH; i++) {
    buf[i] = i + 97
  }
})

export default (suite) => {
  suite
    .add('BrowserBuffer#concat', function () {
      const x = BrowserBuffer.concat([browserBuffer, browserBuffer2], LENGTH * 2)
    })
    .add('Uint8Array#concat', function () {
      const x = new Uint8Array(LENGTH * 2)
      x.set(typedarray, 0)
      x.set(typedarray2, typedarray.length)
    })

  if (!process.browser) suite
    .add('NodeBuffer#concat', function () {
      const x = Buffer.concat([nodeBuffer, nodeBuffer2], LENGTH * 2)
    })
}
