
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
  getJustifyContent,
  geteAlignItems,
  getFlexDirection,
  getKeyValue,
  getKeyValueLast,
  getOrientation,
  getFs,
  getFw,
  getTextAlign,
  getTextAlignLast,
  getUserSelect,
  getTextDecoration,
  getDisplay,
  getColor,
  getWordBreak,
  getLetterSpacing,
  getMinOrMaxHeightOrWidth,
  getZindex,
  getLineHeight,
  getFlexBasis,
  getBorder,
  getBorderRadius,
  getTextEllipsisNum
} = require('./classNameToObj')
const { clearPreArray } = require('./preRender')

function filterClassNames (sourceStr) {
  cssSet.clear() // 清空set
  clearPreArray() // 清空预编译
  const classNameList = sourceStr.match(getConfig(GLOB_REG))
  if (classNameList) {
    classNameList.forEach(hasClassNameStr => {
      // 替换我们规则中不会出现的字符 替换成空格 注意前后必须有空格 可能导致拼接合法 会多生成几条 无所谓
      const className = hasClassNameStr.replace(/[^a-zA-Z0-9-]/g, ' ')
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
      if (rule.static !== undefined) {
        pushPreObj({ render: () => rule.static })
        return null
      }
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
        case 'justify-content':
          pushPreObj(getJustifyContent(v))
          break
        case 'align-items':
          pushPreObj(geteAlignItems(v))
          break
        case 'flex-direction':
          pushPreObj(getFlexDirection(v))
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
        case 'flex-basis':
          pushPreObj(getFlexBasis(v))
          break
        case 'border':
          pushPreObj(getBorder(v))
          break
        case 'border-radius':
          pushPreObj(getBorderRadius(v))
          break
        case 'text-align-last':
          pushPreObj(getTextAlignLast(v))
          break
        case 'text-decoration':
          pushPreObj(getTextDecoration(v))
          break
        case 'text-ellipsis-num':
          pushPreObj(getTextEllipsisNum(v))
          break
        case 'user-select':
          pushPreObj(getUserSelect(v))
          break
        case 'flexNum': // flex 数值
        case 'position': // 定位方式
        case 'cursor': // 鼠标样式
          pushPreObj(getKeyValue(v))
          break
        case 'border-style':
        case 'overflow':
        case 'flexShrinkAndGrow':
          pushPreObj(getKeyValueLast(v))
          break
      }
    }
  })
}

module.exports = {
  filterClassNames,
  filterClass
}
