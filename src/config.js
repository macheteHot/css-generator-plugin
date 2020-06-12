const { EXT_NAME, GLOB_REG, COLORS, UNIT, IMPORTANT } = require('./constant')
let programConfig = {}
const runType = {
  vue: {
    [EXT_NAME]: ['vue'],
    reg: /((?<=class=(["']))[\s\S]*?(?=\2))|((?<=class={)[\s\S]*?(?=}))/gi
  },
  'd-mini-program': {
    [EXT_NAME]: ['axml'],
    reg: /((?<=class=")|(?<=classname="))[\s\S]+?(?=")/gi
  }
}
function getConfig (str) {
  switch (str) {
    // 此处配置默认值
    case EXT_NAME:
      return runType[programConfig.type][EXT_NAME]
    case GLOB_REG:
      return runType[programConfig.type].reg
    case COLORS: // 默认空对象
      return programConfig[COLORS] || {}
    case UNIT: // 默认px
      return programConfig[UNIT] || 'px'
    case IMPORTANT: // 默认添加！important 设置默认值
      return programConfig[IMPORTANT] === undefined ? true : programConfig[IMPORTANT]
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
