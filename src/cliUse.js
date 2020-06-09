const { init, hotReloadwatcher } = require('./index')
const { setConfig } = require('./config')

// cli 调用
function main (options) {
  setConfig(options)
  init()
  if (process.env.NODE_ENV === 'development') {
    hotReloadwatcher()
  } else {
    console.log('init done have a nice day!')
  }
}

module.exports = main
