const { renderCss, clearPreArray } = require('../bin/preRender')
const { filterClass } = require('../bin/filterClass')

function getCss (str) {
  clearPreArray() // 先清空
  filterClass(str)
  return renderCss().replace(/\n/, '')
}

module.exports = {
  getCss
}
