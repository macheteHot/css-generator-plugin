const { filterClassNames } = require('./filterClass')
const { renderCss } = require('./preRender')
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const glob = require('glob')
const shelljs = require('shelljs')
const { getConfig } = require('./config')
const { EXT_NAME, GENERATE, DIR_PATH, CSS_ANNOTATION } = require('./constant')

function getAllFileClassStr () {
  const globSyncStr = getConfig(EXT_NAME).join('|')
  const files = glob.sync(path.join(process.cwd(), `./${getConfig(DIR_PATH)}/**/*.@(${globSyncStr})`))
  return files.reduce((t, c) => t + fs.readFileSync(path.resolve(c), 'utf8'), '')
}

function wirteToFile () {
  const cssFilePath = path.resolve(getConfig(GENERATE))
  const cssDirPath = path.resolve(getConfig(GENERATE), '..')
  if (!fs.existsSync(cssDirPath)) {
    shelljs.mkdir('-p', cssDirPath)
  }
  fs.writeFileSync(cssFilePath, `${CSS_ANNOTATION}${renderCss()}\n`)
}

function getFilePath (str) {
  return path.resolve(process.cwd(), str)
}

function init () {
  console.time('init Time')
  filterClassNames(getAllFileClassStr())
  wirteToFile()
  console.log('============= init done =============')
  console.timeEnd('init Time')
}

function readConfigFile () {
  let options = null
  if (fs.existsSync(getFilePath('css.generator.config.js'))) {
    options = require(getFilePath('css.generator.config.js'))
  } else
  if (fs.existsSync(getFilePath('css.generator.config.json'))) {
    options = JSON.parse(fs.readFileSync(getFilePath('css.generator.config.json')))
  } else {
    throw new Error('you dont have any config!!! see https://github.com/macheteHot/css-generator-plugin/blob/master/README.md')
  }
  return options
}

function hotReloadwatcher () {
  const regStr = getConfig(EXT_NAME).join('|')
  const watcher = chokidar.watch(path.resolve(getConfig(DIR_PATH)), {
    ignored: new RegExp(`^.*\\.(?:(?!(${regStr})).)+$`),
    persistent: true
  })
  watcher.on('change', () => {
    console.time('reload time')
    filterClassNames(getAllFileClassStr())
    wirteToFile()
    console.log('============= reload done =============')
    console.timeEnd('reload time')
  })
}

module.exports = {
  init,
  hotReloadwatcher,
  readConfigFile
}
