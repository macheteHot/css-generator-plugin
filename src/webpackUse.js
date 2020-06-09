const { init, hotReloadwatcher, readConfigFile } = require('./index')
const { setConfig } = require('./config')

class Main {
  constructor (options) {
    if (options === undefined) {
      options = readConfigFile()
    }
    setConfig(options)
  }

  apply (compiler) {
    compiler.hooks.afterPlugins.tap('vue-generate-css', () => {
      init()
      if (process.env.NODE_ENV === 'development') {
        hotReloadwatcher()
      }
    })
  }
}

module.exports = Main
