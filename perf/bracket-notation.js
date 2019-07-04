import { Buffer as BrowserBuffer } from '../' // (this module)

const LENGTH = 50
const browserBuffer = new BrowserBuffer(LENGTH)
const typedarray = new Uint8Array(LENGTH)
const nodeBuffer = new Buffer(LENGTH)

export default (suite) => {
  suite
    .add('BrowserBuffer#bracket-notation', function () {
      for (let i = 0; i < LENGTH; i++) {
        browserBuffer[i] = i + 97
      }
    })
    .add('Uint8Array#bracket-notation', function () {
      for (let i = 0; i < LENGTH; i++) {
        typedarray[i] = i + 97
      }
    })

  if (!process.browser) suite
    .add('NodeBuffer#bracket-notation', function () {
      for (let i = 0; i < LENGTH; i++) {
        nodeBuffer[i] = i + 97
      }
    })
}
