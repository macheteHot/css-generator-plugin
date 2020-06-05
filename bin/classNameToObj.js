const { textToRgbText, getColorsKey } = require('./colorUtils')

const directionMap = new Map()
directionMap.set(undefined, { dirStr: [''], order: 10 }) // 全部
directionMap.set('', { dirStr: [''], order: 20 }) // 全部
directionMap.set('x-', { dirStr: ['-left', '-right'], order: 11 })
directionMap.set('y-', { dirStr: ['-top', '-bottom'], order: 12 })
directionMap.set('x', { dirStr: ['left', 'right'], order: 21 })
directionMap.set('y', { dirStr: ['top', 'bottom'], order: 22 })
directionMap.set('t-', { dirStr: ['-top'], order: 13 })
directionMap.set('r-', { dirStr: ['-right'], order: 14 })
directionMap.set('b-', { dirStr: ['-bottom'], order: 15 })
directionMap.set('l-', { dirStr: ['-left'], order: 16 })
directionMap.set('t', { dirStr: ['top'], order: 23 })
directionMap.set('r', { dirStr: ['right'], order: 24 })
directionMap.set('b', { dirStr: ['bottom'], order: 25 })
directionMap.set('l', { dirStr: ['left'], order: 26 })

function getWorH (str) {
  const reg = /^(w|h)-(\d+)(.*)$/
  const [name, type, num, unit] = str.match(reg)
  return {
    name,
    type: type === 'w' ? 'height' : 'width',
    order: type === 'w' ? 4 : 5, // w is 4 h is 5
    num,
    // 隐式转换 两个等于
    // eslint-disable-next-line eqeqeq
    unit: num == 0 ? '' : unit, // unit 渲染的时候添加
    render () {
      return `.${this.name}{${this.type}:${this.num}${this.unit};}`
    }
  }
}
// 获取margin 或者 padding
function getMorP (str) {
  const reg = /^(m|p)-(t-|r-|b-|l-|x-|y-|)?m?(-?\d+)(\w{0,3})$/
  const [name, type, direction, num, unit] = str.match(reg)
  const { dirStr, order } = directionMap.get(direction)
  return {
    name,
    type: type === 'm' ? 'margin' : 'padding',
    direction: dirStr,
    order,
    num,
    // 隐式转换 两个等于!!!!!!
    // eslint-disable-next-line eqeqeq
    unit: num == 0 ? '' : unit,
    render () {
      const cssText = this.direction.reduce((t, c) =>
        `${t}${this.type}${c}:${this.num}${this.unit};`, '')
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
  const { dirStr, order } = directionMap.get(type)
  return {
    name,
    type: dirStr,
    order,
    num: name.includes('-m-') ? `-${num}` : num,
    unit: unit,
    render () {
      return `.${this.name}{${this.type}:${this.num}${this.unit};}`
    }
  }
}

function getFw (str) {
  const value = str.split('-')[1]
  return {
    name: str,
    type: 'fw',
    order: 60,
    value,
    render () {
      return `.${this.name}{font-weight:${this.value};}`
    }
  }
}

function getFs (str) {
  const reg = /^(?:fs|font-size)-(\d+)(.*)$/
  const [name, num, unit] = str.match(reg)
  return {
    name,
    type: 'font-size',
    order: 60,
    num,
    unit: unit,
    render () {
      return `.${this.name}{font-size:${this.num}${this.unit};}`
    }
  }
}

function getDisplay (str) {
  const reg = /^(?:d|display)-(.*)$/
  const [name, value] = str.match(reg)
  return {
    name,
    type: 'display',
    order: 70,
    value,
    render () {
      return `.${this.name}{display:${this.value};}`
    }
  }
}

function getColor (str) {
  const colorRegSplit = getColorsKey().length === 0 ? '' : `|${getColorsKey().join('|')}`
  const reg = new RegExp(
    `^(color|c|text|bg|background|border-color)-(?:(hover|link|visited|active|focus|focus-within)-)?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}${colorRegSplit})(?:-(1|([1-9]\\d{0,1})|100))?$`
  )
  const [name, cssType, pseudo, color, opacity] = str.match(reg)
  const obj = {
    name,
    type: 'color',
    order: 80,
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

function getKeyValue (str) {
  // 最后一个-分割
  const reg = /^(.+)-(.+)$/
  const [name, key, value] = str.match(reg)
  return {
    name,
    key,
    order: 100,
    value,
    render () {
      return `.${this.name}{${this.key}:${this.value};}`
    }
  }
}

function getWordBreak(){
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

module.exports = {
  getWorH,
  getMorP,
  getFlex,
  getKeyValue,
  getOrientation,
  getFw,
  getFs,
  getDisplay,
  getColor,
  getWordBreak
}
