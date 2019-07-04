/* global Benchmark*/

if (!process.browser) global.Benchmark = require('benchmark')

export default () => (new Benchmark.Suite())
    .on('error', function (event) {
      console.error(event.target.error.stack)
    })
    .on('cycle', function (event) {
      console.log(String(event.target))
    })
    .on('complete', function () {
      console.log('Fastest is ' + this.filter('fastest').map('name'))
    })
