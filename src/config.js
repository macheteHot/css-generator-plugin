import { EXT_NAME, GLOB_REG, COLORS, UNIT, IMPORTANT, MODIFY_RULES } from './constant'

let programConfig = {
  [MODIFY_RULES]: {}
}
const runType = {
  vue: {
    [EXT_NAME] : ['vue'],
    reg        : /((?<=class=(["']))[\s\S]*?(?=\2))|((?<=class={)[\s\S]*?(?=}))/gi
  },
  react: {
    [EXT_NAME] : ['tsx', 'jsx'],
    reg        : /((?<=className=(["']))[\s\S]*?(?=\2))|((?<=className={)[\s\S]*?(?=}))/gi
  },
  'd-mini-program': { // 钉钉小程序
    [EXT_NAME] : ['axml'],
    reg        : /((?<=class=")|(?<=classname="))[\s\S]+?(?=")/gi
  },
  'wx-mini-program': { // 微信小程序
    [EXT_NAME] : ['wxml'],
    reg        : /((?<=class=")|(?<=classname="))[\s\S]+?(?=")/gi
  },
  html: { // 单纯 html
    [EXT_NAME] : ['html'],
    reg        : /((?<=class=(["']))[\s\S]*?(?=\2))/gi
  }
}
export function getConfig (str) {
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

export function setConfig (config) {
  programConfig = config
}
export function getUnit (str) {
  if (str === 'p') {
    return '%'
  }
  if (!str) {
    return programConfig[UNIT] || 'px'
  }
  return str
}
