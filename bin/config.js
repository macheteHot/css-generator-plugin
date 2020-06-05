const { EXT_NAME, GLOB_REG } = require('./constant')
let programConfig = {}
function getConfig (str) {
  const runType = {
    vue: {
      extName: 'vue',
      reg: /((?<=class=")[\s\S]+?(?="))|((?<=class={)[\s\S]+?(?=}))/g
    },
    'mini-program': {
      extName: 'axml',
      reg: ''
    }
  }
  switch (str) {
    case EXT_NAME:
      return runType[programConfig.type].extName
    case GLOB_REG:
      return runType[programConfig.type].reg
    default: // dirPath generate unit
      return programConfig[str]
  }
}

function setConfig (config) {
  programConfig = config
}
module.exports = {
  setConfig,
  getConfig
}
