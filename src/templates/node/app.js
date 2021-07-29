require('babel-register')({
  presets: ['es2015'],
  plugins: ['transform-object-rest-spread']
})
require('module-alias/register')

module.exports = require('./src/index.js')
