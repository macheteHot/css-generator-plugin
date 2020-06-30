const { IMPORTANT } = require('./constant')
const { groupBy } = require('lodash')

const { getConfig } = require('./config')
let preArry = []

function pushPreObj (obj) {
  return preArry.push(obj)
}

function getPreArray () {
  return preArry
}

function clearPreArray () {
  preArry = []
}

function getCssSingle ({ classStr, pseudo, css }) {
  if (pseudo) {
    classStr = classStr + `:${pseudo}`
  }
  return css.reduce((t, c, i) => {
    return t + (getConfig(IMPORTANT) ? `${c} !important; ` : `${c}; `)
  }, `.${classStr}{ `) + '}'
}

function renderCss () {
  let cssStr = ''
  const cssObject = groupBy(preArry.sort((a, b) => a.order - b.order), 'name')
  for (const key in cssObject) {
    if (Object.prototype.hasOwnProperty.call(cssObject, key)) {
      cssStr += `/* ${key} order ${cssObject[key][0].order} */\n`
      cssStr += cssObject[key]
        .sort((a, b) => a.num - b.num)
        .map(getCssSingle)
        .join('\n')
      cssStr += '\n\n'
    }
  }
  return cssStr
  // let cssStr = preArry
  //   .sort((a, b) => a.order - b.order)
  //   .reduce((t, c) => {
  //     // 如果有数值 并且数值是 0 将单位清空 数值转换number 防止 -0
  //     if (Object.prototype.hasOwnProperty.call(c, 'num') && parseInt(c.num) === 0) {
  //       c[UNIT] = ''
  //       c.num = 0
  //       // 如果有单位 那么进行单位转换
  //     } else if (Object.prototype.hasOwnProperty.call(c, UNIT)) {
  //       c[UNIT] = convertUnit(c[UNIT])
  //     }
  //     return t + c.render() + '\n'
  //   }, '')
  // if (getConfig(IMPORTANT)) {
  //   cssStr = cssStr.replace(/;/g, ' !important;')
  // }
  // return cssStr
}
module.exports = {
  pushPreObj,
  renderCss,
  getPreArray,
  clearPreArray
}
