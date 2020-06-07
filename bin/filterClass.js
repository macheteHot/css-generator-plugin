
const cssSet = new Set() // 用来去重
const { getRegList } = require('./createReg')
const { pushPreObj } = require('./preRender')
const { GLOB_REG } = require('./constant')
const { getConfig } = require('./config')
const {
  getWorH,
  getSquare,
  getMorP,
  getFlex,
  getKeyValue,
  getLineHeight,
  getMinOrMaxHeightOrWidth,
  // getKeyValueLast,
  getFw,
  getOrientation,
  getFs,
  getDisplay,
  getColor,
  getWordBreak,
  getTextAlign,
  getLetterSpacing,
  getZindex
} = require('./classNameToObj')
const { clearPreArray } = require('./preRender')

function filterClassNames (sourceStr) {
  cssSet.clear() // 清空set
  clearPreArray() // 清空预编译
  const classNameList = sourceStr.match(getConfig(GLOB_REG))
  if (classNameList) {
    classNameList.forEach(hasClassNameStr => {
      // 替换规则中不会出现的字符 替换成空格 防止拼接导致合法
      const className = hasClassNameStr.replace(/[^a-zA-Z0-9_-\s]/g, ' ')
      className.split(' ').forEach(filterClass)
    })
  }
  return ''
}
function filterClass (classStr) {
  getRegList().forEach((rule) => {
    if (rule.regExp.test(classStr) && !cssSet.has(classStr)) { // 经过正则匹配 并且 list 中不存在
      cssSet.add(classStr)
      const v = classStr
      switch (rule.className) {
        case 'widthOrHeight':
          pushPreObj(getWorH(v))
          break
        case 'square':
          pushPreObj(getSquare(v))
          break
        case 'minMaxWidthOrHeight':
          pushPreObj(getMinOrMaxHeightOrWidth(v))
          break
        case 'marginOrPadding':
          pushPreObj(getMorP(v))
          break
        case 'text-align':
          pushPreObj(getTextAlign(v))
          break
        case 'line-height':
          pushPreObj(getLineHeight(v))
          break
        case 'flex':
          pushPreObj(getFlex(v))
          break
        case 'flexNum':
          pushPreObj(getKeyValue(v))
          break
        case 'position': // 定位方式
          pushPreObj(getKeyValue(v))
          break
        case 'cursor': // 鼠标样式
          pushPreObj(getKeyValue(v))
          break
        case 'word-break': // 文字折叠
          pushPreObj(getWordBreak(v))
          break
        case 'orientation': // 绝对定位
          pushPreObj(getOrientation(v))
          break
        case 'font-weight': // 字体粗细
          pushPreObj(getFw(v))
          break
        case 'font-size':
          pushPreObj(getFs(v))
          break
        case 'display':
          pushPreObj(getDisplay(v))
          break
        case 'color':
          pushPreObj(getColor(v))
          break
        case 'letter-spacing':
          pushPreObj(getLetterSpacing(v))
          break
        case 'zIndex':
          pushPreObj(getZindex(v))
          break
      }
    }
  })
}

module.exports = {
  filterClassNames,
  filterClass
}
