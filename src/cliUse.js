const { filterClassNames } = require('./filterClass')
const { renderCss } = require('./preRender')
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const glob = require('glob')
const shelljs = require('shelljs')
const { getConfig, setConfig } = require('./config')
const { EXT_NAME, GENERATE, DIR_PATH } = require('./constant')

function getAllVueFileClassStr () {
  const files = glob.sync(path.join(process.cwd(), `./${getConfig('dirPath')}/**/*.${getConfig(EXT_NAME)}`))
  return files.reduce((t, c) => t + fs.readFileSync(path.resolve(c), 'utf8'), '')
}

function wirteToFile () {
  const cssFilePath = path.resolve(getConfig(GENERATE))
  const cssDirPath = path.resolve(getConfig(GENERATE), '..')
  if (!fs.existsSync(cssDirPath)) {
    shelljs.mkdir('-p', cssDirPath)
  }
  fs.writeFileSync(cssFilePath, `@charset "UTF-8";\n${renderCss()}`)
}

// cli 调用
function main (options) {
  setConfig(options)
  console.time('初始化耗时')
  filterClassNames(getAllVueFileClassStr())
  wirteToFile()
  console.log('=============初始化完成=============')
  console.timeEnd('初始化耗时')
  console.log('\n\n')
  const watcher = chokidar.watch(path.resolve(getConfig(DIR_PATH)), {
    ignored: new RegExp(`^.*\\.(?:(?!(${getConfig(EXT_NAME)})).)+$`),
    persistent: true
  })
  watcher.on('change', () => {
    console.time('热更新耗时')
    filterClassNames(getAllVueFileClassStr())
    wirteToFile()
    console.log('=============热更新完成=============')
    console.timeEnd('热更新耗时')
    console.log('\n\n')
  })
}

module.exports = main
