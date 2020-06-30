// const { getColorsKey } = require('./colorUtils')
const path = require('path')
const rulesObjList = require('require-all')({
  dirname: path.join(__dirname, '/rules'),
  filter: /.*\.js$/
})
function getRegList () {
  return Object.values(rulesObjList)
  // {
  // // 所有有关颜色的
  //   className: 'color',
  //   regExp: new RegExp(
  //     `^(color|c|text|bg|background|border-color|border-c)-((hover|link|visited|active|focus|focus-within)-)?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|${getColorsKey().join('|')})(-(1|([1-9]\\d{0,1})))?$`
  //   )
  // },
  // ]
}

module.exports = {
  getRegList
}
