const { UNIT } = require('./constant')
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

function convertUnit (str) {
  if (!str) return getConfig(UNIT)
  if (str === 'p') return '%'
  return str
}

function renderCss () {
  const cssStr = preArry
    .sort((a, b) => a.order - b.order)
    .reduce((t, c) => {
      // 如果有数值 并且数值是 0 将单位清空 数值转换number 防止 -0
      if (Object.prototype.hasOwnProperty.call(c, 'num') && parseInt(c.num) === 0) {
        c[UNIT] = ''
        c.num = 0
        // 如果有单位 那么进行单位转换
      } else if (Object.prototype.hasOwnProperty.call(c, UNIT)) {
        c[UNIT] = convertUnit(c[UNIT])
      }
      return t + c.render() + '\n'
    }, '')
  return cssStr
}
module.exports = {
  pushPreObj,
  renderCss,
  getPreArray,
  clearPreArray,
  convertUnit
}
