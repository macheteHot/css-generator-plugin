import { filterClassNames } from './filterClass'
import { renderCss } from './preRender'
import { getConfig } from './config'
import { EXT_NAME, GENERATE, DIR_PATH, CSS_ANNOTATION } from './constant'
const { performance } = require('perf_hooks')
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const glob = require('glob')
const shelljs = require('shelljs')
let hotReload = false

let startTime = 0
let endTime = 0
const setTimeStart = () => {
  startTime = performance.now()
}
const setTimeEnd = () => {
  endTime = performance.now()
}

const getUseTime = () => (endTime - startTime).toFixed(2)

function readFile (path) {
  return fs.readFileSync(path, 'utf8')
}

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

function logUseTime () {
  console.log(`css generator ${hotReload ? 'reload' : 'init'} done use time ${getUseTime()}ms`)
}

export function init (compiler) {
  setTimeStart()
  filterClassNames(getAllFileClassStr())
  wirteToFile()
  setTimeEnd()
  if (compiler) {
    compiler.hooks.done.tap('css-generator-done', logUseTime)
  } else {
    logUseTime()
  }
}

export function readConfigFile () {
  let options = null
  if (fs.existsSync(getFilePath('css.generator.config.js'))) {
    options = require(getFilePath('css.generator.config.js'))
  } else {
    throw new Error('you dont have any config!!! see https://github.com/macheteHot/css-generator-plugin/blob/master/README.md')
  }
  return options
}

export function hotReloadwatcher (compiler) {
  hotReload = true
  const regStr = getConfig(EXT_NAME).join('|')
  const watcher = chokidar.watch(path.resolve(getConfig(DIR_PATH)), {
    // ignored: new RegExp(`^.*\\.(?:(?!(${regStr})).)+$`),
    ignored: new RegExp(`^\\/([^/]+\\/)*[^/]*\\.((?!${regStr}).)+$`),
    persistent: true
  })
  watcher.on('change', (path) => {
    setTimeStart()
    startTime = performance.now()
    filterClassNames(readFile(path))
    wirteToFile()
    setTimeEnd()
    if (!compiler) { logUseTime() }
  })
}
