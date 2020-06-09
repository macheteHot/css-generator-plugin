const { EXT_NAME, GLOB_REG, COLORS, UNIT, IMPORTANT } = require('./constant')
let programConfig = {}
const runType = {
  vue: {
    extName: 'vue',
    reg: /((?<=class=")[\s\S]+?(?="))|((?<=class={)[\s\S]+?(?=}))/g
  },
  'd-mini-program': {
    extName: 'axml',
    reg: /(?<=class=")[\s\S]+?(?=")/g
  }
}
function getConfig (str) {
  switch (str) {
    // 此处配置默认值
    case EXT_NAME:
      return runType[programConfig.type].extName
    case GLOB_REG:
      return runType[programConfig.type].reg
    case COLORS: // 默认空对象
      return programConfig[COLORS] !== undefined ? programConfig[COLORS] : {}
    case UNIT: // 默认px
      return programConfig[UNIT] !== undefined ? programConfig[UNIT] : 'px'
    case IMPORTANT: // 默认添加！important
      return programConfig[IMPORTANT] !== undefined ? programConfig[IMPORTANT] : true
    default: // dirPath generate  等项目配置
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
