import { Buffer as BrowserBuffer } from '../' // (this module)

const LENGTH = 16

const browserSubject = new BrowserBuffer(LENGTH)
const typedarraySubject = new Uint8Array(LENGTH)
const nodeSubject = new Buffer(LENGTH)

const browserTarget = new BrowserBuffer(LENGTH)
const typedarrayTarget = new Uint8Array(LENGTH)
const nodeTarget = new Buffer(LENGTH)

export default (suite) => {
  suite
    .add('BrowserBuffer#copy(' + LENGTH + ')', function () {
      browserSubject.copy(browserTarget)
    })
    .add('Uint8Array#copy(' + LENGTH + ')', function () {
      typedarrayTarget.set(typedarraySubject, 0)
    })

  if (!process.browser) suite
    .add('NodeBuffer#copy(' + LENGTH + ')', function () {
      nodeSubject.copy(nodeTarget)
    })
}
