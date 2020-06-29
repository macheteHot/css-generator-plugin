// const { getColorsKey } = require('./colorUtils')
const path = require('path')
const rulesObjList = require('require-all')({
  dirname: path.join(__dirname, '/rules'),
  filter: /.*\.js$/
})
function getRegList () {
  return Object.values(rulesObjList)
  // // overflow
  // {
  //   className: 'overflow',
  //   regExp: /^overflow(-[xy])?-(hidden|auto|visible|scroll|inherit)$/
  // },
  // {
  // // 所有有关颜色的
  //   className: 'color',
  //   regExp: new RegExp(
  //     `^(color|c|text|bg|background|border-color|border-c)-((hover|link|visited|active|focus|focus-within)-)?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|${getColorsKey().join('|')})(-(1|([1-9]\\d{0,1})))?$`
  //   )
  // },
  // {
  //   className: 'letter-spacing',
  //   regExp: new RegExp(`^letter-spacing-(m-)?(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
  // },
  // {
  //   className: 'circle',
  //   regExp: /^circle$/,
  //   static: '.circle{border-radius:50%;}'
  // },
  // {
  //   className: 'border',
  //   // 这个宽度没有百分比
  //   regExp: new RegExp(`^(border|border-width|border-w)-([trblxy]-)?(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
  // },
  // {
  //   className: 'border-radius',
  //   regExp: new RegExp(`^(border-radius|br)-(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
  // },
  // {
  //   className: 'border-style',
  //   regExp: /^border-style-(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|inherit)$/
  // },
  // {
  //   className: 'text-align-last',
  //   regExp: /^(text-align-last|text-last)-(auto|left|right|center|justify|start|end|initial|inherit)$/
  // },
  // {
  //   className: 'text-decoration',
  //   regExp: /^(text-decoration|text)-(none|underline|overline|line-through|blink|inherit)$/
  // },
  // {
  //   className: 'user-select',
  //   regExp: /^(user-)?select-(none|auto|text|all|contain|element)$/
  // },
  // {
  //   className: 'text-ellipsis-num',
  //   regExp: /^(text-)?ellipsis(-[1-9]\d*)?$/
  // }
  // ]
}

module.exports = {
  getRegList
}
