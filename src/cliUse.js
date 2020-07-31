import { init, hotReloadwatcher } from './index'
import { setConfig } from './config'

// cli 调用
function run (options) {
  setConfig(options)
  init()
  hotReloadwatcher()
}

const fs = require('fs')
const program = require('commander')
const path = require('path')
const { version } = require('../package.json')

const description =
  `An application to generate Style Sheets file
the default config file is css.generator.config.js`
program
  .version(version, '-v, --version')
  .description(description)
  .option('-c, --config-file [fileName]', 'set config file')
  .parse(process.argv)
let configObj = {}

function getFilePath (str) {
  return path.resolve(process.cwd(), str)
}

if (!program.configFile) {
  if (fs.existsSync(getFilePath('css.generator.config.js'))) {
    configObj = require(getFilePath('css.generator.config.js'))
    run(configObj)
  } else {
    program.help()
    process.exit()
  }
}

if (program.configFile) {
  if (!fs.existsSync(getFilePath(program.configFile))) { // 配置文件不存在
    console.error('')
    console.error('error file path!')
    console.error('')
    process.exit()
  }

  const extname = path.extname(program.configFile)

  if (extname === 'json') {
    configObj = JSON.parse(fs.readFileSync(getFilePath(program.configFile)))
    run(configObj)
  } else if (extname === 'js') {
    configObj = require(getFilePath(program.configFile))
    run(configObj)
  } else {
    console.error('')
    console.error('only accpect js or json file!')
    console.error('')
    process.exit()
  }
}
