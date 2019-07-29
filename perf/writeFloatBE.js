import { Buffer as BrowserBuffer } from '../' // (this module)

const LENGTH = 160

const browserBuffer = new BrowserBuffer(LENGTH * 4)
const typedarray = new Uint8Array(LENGTH * 4)
const dataview = new DataView(typedarray.buffer)
const nodeBuffer = new Buffer(LENGTH * 4)

export default (suite) => {
  suite
    .add('BrowserBuffer#writeFloatBE', function () {
      for (let i = 0; i < LENGTH; i++) {
        browserBuffer.writeFloatBE(97.1919 + i, i * 4)
      }
    })
    .add('DataView#setFloat32', function () {
      for (let i = 0; i < LENGTH; i++) {
        dataview.setFloat32(i * 4, 97.1919 + i)
      }
    })

  if (!process.browser) suite
    .add('NodeBuffer#writeFloatBE', function () {
      for (let i = 0; i < LENGTH; i++) {
        nodeBuffer.writeFloatBE(97.1919 + i, i * 4)
      }
    })
}
