import { init, readConfigFile, hotReloadFn } from './index'
import { setConfig, getConfig } from './config'
import { EXT_NAME } from './constant'

module.exports = function vitePlugin () {
  const gcssConfig = readConfigFile()
  return {
    name: 'vite-plugin',
    config (config) {
      setConfig(gcssConfig)
      init()
      return config
    },
    async handleHotUpdate ({ file, read }) {
      const [, extName] = file.match(/(?<=\.)([\w\d]+)$/)
      if (!getConfig(EXT_NAME).includes(extName)) { return null }
      hotReloadFn(await read())
    }
  }
}
