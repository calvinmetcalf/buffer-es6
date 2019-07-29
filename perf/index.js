import createSuite from './util'

import bracketNotation from  './bracket-notation.js'
import concat from './concat.js'
import copy from './copy.js'
import copyBig from './copy-big.js'
import newBuffer from './new.js'
import newBig from './new-big.js'
import readDoubleBE from './readDoubleBE.js'
import readFloatBE from './readFloatBE.js'
import readUInt32LE from './readUInt32LE.js'
import readUtf8 from './readUtf8.js'
import slice from './slice.js'
import writeFloatBE from './writeFloatBE.js'
import writeUtf8 from './writeUtf8.js'

const testSuites = [
 bracketNotation,
 concat,
 copy,
 copyBig,
 newBuffer,
 newBig,
 readDoubleBE,
 readFloatBE,
 readUInt32LE ,
 readUtf8,
 slice,
 writeFloatBE,
 writeUtf8,
]

for (let testSuite of testSuites) {
  const suite = createSuite()
  testSuite(suite)
  suite.run()
}
