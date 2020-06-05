let preArry = []
let defaultUnit = 'px'

function setDefaultUnit (unit) {
  defaultUnit = unit
}

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
  if (!str) return defaultUnit
  if (str === 'p') return '%'
  return str
}

function renderCss () {
  const cssStr = preArry
    .sort((a, b) => a.order - b.order)
    .reduce((t, c) => {
      // 如果有单位 进行单位转换
      if (Object.prototype.hasOwnProperty.call(c, 'unit')) {
        c.unit = convertUnit(c.unit)
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
  setDefaultUnit
}
