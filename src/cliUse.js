import { init, hotReloadwatcher, readConfigFile } from './index'
import { setConfig } from './config'

// cli 调用
function run (options) {
  setConfig(options)
  init()
  hotReloadwatcher()
}

const program = require('commander')
const { version } = require('../package.json')

const description =
  `An application to generate Style Sheets file
the default config file is css.generator.config.js`
program
  .version(version, '-v, --version')
  .description(description)
  .option('-c, --config-file [fileName]', 'set config file')
  .parse(process.argv)

const configObj = readConfigFile()
run(configObj)
