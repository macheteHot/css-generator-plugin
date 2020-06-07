const { renderCss, clearPreArray } = require('../src/preRender')
const { filterClass } = require('../src/filterClass')

function getCss (str) {
  clearPreArray() // 先清空
  filterClass(str)
  const cssStr = renderCss()
  return cssStr ? cssStr + '\n' : ''
}

module.exports = {
  getCss
}
