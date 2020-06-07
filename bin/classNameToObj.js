const { textToRgbText, getColorsKey } = require('./colorUtils')
const directionMap = new Map()
directionMap.set(undefined, { dirStr: [''], order: 10 }) // 全部
directionMap.set('', { dirStr: [''], order: 10 }) // 全部
directionMap.set('x', { dirStr: ['left', 'right'], order: 11 })
directionMap.set('y', { dirStr: ['top', 'bottom'], order: 12 })
directionMap.set('t', { dirStr: ['top'], order: 13 })
directionMap.set('r', { dirStr: ['right'], order: 14 })
directionMap.set('b', { dirStr: ['bottom'], order: 15 })
directionMap.set('l', { dirStr: ['left'], order: 16 })
// 通过存在-mi- 判断是否是负数
function isMinus (str) {
  return str.includes('-m-')
}
/**
 * 按最后一个 - 分割 属性
 * @param {string} 最后一个 - 分割
 * 单条属性 优先级最高 Infinity
 */
function getKeyValueLast (str) {
  const reg = /^(.+)-(.+)$/
  const [name, key, value] = str.match(reg)
  return {
    name,
    key,
    order: Infinity,
    value,
    render () {
      return `.${this.name}{${this.key}:${this.value};}`
    }
  }
}
/**
 * 通过 第一个 - 分割属性
 * @param {string} 第一个 - 分割
 * 单条属性 优先级最高 Infinity
 */
function getKeyValue (str) {
  const reg = /^(.+?)-(.+)$/
  const [name, key, value] = str.match(reg)
  return {
    name,
    key,
    order: Infinity,
    value,
    render () {
      return `.${this.name}{${this.key}:${this.value};}`
    }
  }
}

function getWorH (str) {
  const reg = /^(w|h)-(\d+)(.*)$/
  const [name, type, num, unit] = str.match(reg)
  return {
    name,
    type: type === 'w' ? 'width' : 'height',
    order: Infinity, // w is 4 h is 5
    num,
    // 不可转类型防止数值过大
    unit, // unit 渲染的时候添加
    render () {
      return `.${this.name}{${this.type}:${this.num}${this.unit};}`
    }
  }
}

function getSquare (str) {
  const reg = /^square-(0|[1-9]\d*)(rem|em|vw|vh|p|px|rpx)?$/
  const [name, num, unit] = str.match(reg)
  return {
    name,
    order: 5,
    num,
    unit,
    render () {
      return `.${this.name}{width:${this.num}${this.unit};height:${this.num}${this.unit};}`
    }
  }
}

// 获取margin 或者 padding
function getMorP (str) {
  const reg = /^(m|p)-(?:([trblxy])-)?(?:m-)?(\d+)(\w{0,3})$/
  const [name, type, direction, num, unit] = str.match(reg)
  const {
    dirStr,
    order
  } = directionMap.get(direction)
  return {
    name,
    type: type === 'm' ? 'margin' : 'padding',
    direction: dirStr,
    order,
    num: `${isMinus(name) ? '-' : ''}${num}`,
    unit,
    render () {
      const cssText = this.direction.reduce((t, c) =>
        `${t}${this.type}${c ? `-${c}` : ''}:${this.num}${this.unit};`, '')
      return `.${this.name}{${cssText}}`
    }
  }
}

function getFlex (str) {
  const reg = /^(?:flex-)(auto|flex-start|flex-end|center|space-between|space-around)-(.+)$/
  const [name, jc, ai] = str.match(reg)
  return {
    name,
    order: 50,
    jc,
    ai,
    render () {
      return `.${this.name}{display:flex;justify-content:${this.jc};align-items:${this.ai};}`
    }
  }
}

function getOrientation (str) {
  const reg = /^([trbl])-(?:m-)?(\d+)(rem|em|vw|vh|p|px|rpx)?$/
  const [name, type, num, unit] = str.match(reg)
  const {
    dirStr,
    order
  } = directionMap.get(type)
  return {
    name,
    type: dirStr,
    order,
    num: `${isMinus(name) ? '-' : ''}${num}`,
    unit, // unit 渲染的时候添加
    render () {
      return `.${this.name}{${this.type}:${this.num}${this.unit};}`
    }
  }
}

function getFs (str) {
  const reg = /^(?:fs|font-size)-(\d+)(.*)$/
  const [name, num, unit] = str.match(reg)
  return {
    name,
    type: 'font-size',
    order: Infinity,
    num,
    unit: unit,
    render () {
      return `.${this.name}{font-size:${this.num}${this.unit};}`
    }
  }
}

function getTextAlign (str) {
  const reg = /^(?:text-align|text)-(start|end|left|right|center|justify|match-parent)$/
  const [name, value] = str.match(reg)
  return {
    name,
    order: Infinity,
    value,
    render () {
      return `.${this.name}{text-align:${this.value};}`
    }
  }
}

function getFw (str) {
  const value = str.split('-')[1]
  return {
    name: str,
    type: 'fw',
    order: Infinity,
    value,
    render () {
      return `.${this.name}{font-weight:${this.value};}`
    }
  }
}

function getDisplay (str) {
  const reg = /^(?:d|display)-(.*)$/
  const [name, value] = str.match(reg)
  return {
    name,
    type: 'display',
    order: Infinity,
    value,
    render () {
      return `.${this.name}{display:${this.value};}`
    }
  }
}

function getColor (str) {
  const colorRegSplit = getColorsKey().length === 0 ? '' : `|${getColorsKey().join('|')}`
  const reg = new RegExp(
    `^(color|c|text|bg|background|border-color|border-c)-(?:(hover|link|visited|active|focus|focus-within)-)?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}${colorRegSplit})(?:-(1|([1-9]\\d{0,1})|100))?$`
  )
  const [name, cssType, pseudo, color, opacity] = str.match(reg)
  const obj = {
    name,
    type: 'color',
    order: Infinity,
    cssType,
    pseudo,
    color: textToRgbText(color),
    opacity: opacity === undefined ? 1 : (opacity * 0.01).toFixed(2),
    render () {
      const getName = this.pseudo === undefined ? this.name : `${this.name}:${this.pseudo}`
      let perfix = ''
      switch (this.cssType) {
        case 'c':
        case 'color':
        case 'text':
          perfix = 'color'
          break
        case 'bg':
        case 'background':
          perfix = 'background-color'
          break
        case 'border-c':
        case 'border-color':
          perfix = 'border-color'
          break
        default:
          perfix = this.cssType
          break
      }
      let colorRgba
      if (this.color !== '') {
        colorRgba = `rgba(${this.color},${this.opacity})`
      }
      if (this.color === 'transparent') {
        colorRgba = 'transparent'
      }
      return `.${getName}{${perfix}:${colorRgba};}`
    }
  }
  return obj
}

function getWordBreak (str) {
  const reg = /^word-break-(.*)$/
  const [name, value] = str.match(reg)
  return {
    name,
    order: 100,
    value,
    render () {
      return `.${this.name}{word-break:${this.value};}`
    }
  }
}

function getLetterSpacing (str) {
  const reg = /^letter-spacing-(?:m-)?(\d+)(rem|em|vw|vh|p|px|rpx)?$/
  const [name, num, unit] = str.match(reg)
  return {
    name,
    num: `${isMinus(name) ? '-' : ''}${num}`,
    order: 110,
    unit, // unit 渲染的时候添加
    render () {
      return `.${this.name}{letter-spacing:${this.num}${this.unit};}`
    }
  }
}

function getMinOrMaxHeightOrWidth (str) {
  const reg = /^(min|max)-([wh])-(0|[1-9]\d*)(rem|em|vw|vh|p|px|rpx)?$/
  const [name, type, wh, num, unit] = str.match(reg)
  return {
    name,
    type,
    wh: wh === 'w' ? 'width' : 'height',
    num,
    order: Infinity,
    unit,
    render () {
      return `.${this.name}{${this.type}-${this.wh}:${this.num}${this.unit};}`
    }
  }
}

function getZindex (str) {
  const reg = /^z-index-(?:m-)?(0|[1-9]\d*)$/
  const [name, num] = str.match(reg)
  return {
    name,
    order: Infinity,
    num: `${isMinus(name) ? '-' : ''}${num}`,
    render () {
      return `.${this.name}{z-index:${this.num}}`
    }
  }
}

function getLineHeight (str) {
  const reg = /^(?:lh|line-height)-((?:(0|[1-9]\d*)(rem|em|vw|vh|p|px|rpx)?)|normal|unset|inherit|initial)$/
  const [name, value, num, unit] = str.match(reg)
  const obj = { name, order: Infinity }
  if (num === undefined) {
    obj.value = value
    obj.render = function () { return `.${this.name}{line-height:${this.value};}` }
  } else {
    obj.num = num
    obj.unit = unit
    obj.render = function () { return `.${this.name}{line-height:${this.num}${this.unit};}` }
  }
  return obj
}

function getCircle () {
  return {
    render () {
      return '.circle{border-radius:50%;}'
    }
  }
}

function getFlexBasis (str) {
  const reg = /^flex-basis-((?:(0|[1-9]\d*)(rem|em|vw|vh|p|px|rpx)?)|initial|inherit|auto)$/
  const [name, value, num, unit] = str.match(reg)
  const obj = {
    name,
    order: Infinity
  }
  if (num === undefined) {
    obj.value = value
    obj.render = function () {
      return `.${this.name}{flex-basis:${this.value};}`
    }
  } else {
    obj.num = num
    obj.unit = unit
    obj.render = function () {
      return `.${this.name}{flex-basis:${this.num}${this.unit};}`
    }
  }
  return obj
}
function getBorder (str) {
  const reg = /^(?:border|border-width|border-w)-(?:([trblxy])-)?(0|[1-9]\d*)(rem|em|vw|vh|px|rpx)?$/
  // "border-w-x-20rem", "x", "20", "rem",
  const [name, direction, num, unit] = str.match(reg)
  const { dirStr, order } = directionMap.get(direction)
  const obj = {
    name,
    dirStr, // 循环方向
    order,
    num,
    unit
  }
  if (dirStr[0] === '') { // 没有方向 四个方向都有
    obj.render = function () {
      return `.${this.name} {\n\n  border-width: ${this.num}${this.unit};\n  border-style: solid;\n  border-color: black;\n}`
    }
  } else {
    obj.render = function () {
      const cssStr = this.dirStr.reduce((t, c) => {
        return t + `border${c ? `-${c}` : ''}-width:${this.num}${this.unit};\n  `
      }, `.${this.name} {\n\n  border-width: 0;\n  `)
      return `${cssStr}border-style:solid;\n  border-color: black;\n}`
    }
  }
  return obj
}

module.exports = {
  getWorH,
  getSquare,
  getMorP,
  getFlex,
  getKeyValue,
  getKeyValueLast,
  getOrientation,
  getFs,
  getFw,
  getTextAlign,
  getDisplay,
  getColor,
  getWordBreak,
  getLetterSpacing,
  getMinOrMaxHeightOrWidth,
  getZindex,
  getLineHeight,
  getCircle,
  getFlexBasis,
  getBorder
}
