import { Buffer as BrowserBuffer } from '../' // (this module)

const LENGTH = 16000

export default (suite) => {
  suite
    .add('BrowserBuffer#new(' + LENGTH + ')', function () {
      const buf = new BrowserBuffer(LENGTH)
    })
    .add('Uint8Array#new(' + LENGTH + ')', function () {
      const buf = new Uint8Array(LENGTH)
    })

  if (!process.browser) suite
    .add('NodeBuffer#new(' + LENGTH + ')', function () {
      const buf = new Buffer(LENGTH)
    })
}
