const { init, hotReloadwatcher } = require('./index')
const { setConfig } = require('./config')

// cli 调用
function main (options) {
  setConfig(options)
  init()
  hotReloadwatcher()
}

module.exports = main
