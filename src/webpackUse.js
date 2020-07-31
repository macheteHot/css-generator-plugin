import { init, hotReloadwatcher, readConfigFile } from './index'
import { setConfig } from './config'

module.exports = class Main {
  constructor (options) {
    if (options === undefined) {
      options = readConfigFile()
    }
    setConfig(options)
  }

  apply (compiler) {
    compiler.hooks.afterPlugins.tap('vue-generate-css', () => {
      init(compiler)
      if (process.env.NODE_ENV === 'development') {
        hotReloadwatcher(compiler)
      }
    })
  }
}
