const { renderCss, clearPreArray } = require('../src/preRender')
const { filterClass } = require('../src/filterClass')

function getCss (str) {
  clearPreArray() // 先清空
  filterClass(str)
  return renderCss().replace(/\n/, '')
}

module.exports = {
  getCss
}
