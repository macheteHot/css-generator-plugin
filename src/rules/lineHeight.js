/**
 * order 330
 */
const { UNIT_ENMU_STR } = require('../constant')
const { getUnit } = require('../config')

module.exports = {
  regExp: new RegExp(`^(lh|line-height)-(?<value>((?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?)|normal|unset|inherit|initial)$`),
  render ({ groups }) {
    let { value, num, unit } = groups
    const base = { name: 'lineHeight', order: 330 }
    if (parseInt(num) === 0) { // 如果num 是0 就不管其他的了
      return { ...base, num, css: ['line-height: 0'] }
    }
    if (num !== undefined) { // 如果有数字 就转换单位
      unit = getUnit(unit)
      return { ...base, num, css: [`line-height: ${num}${unit}`] }
    }
    return { ...base, num: Infinity, css: [`line-height: ${value}`] }
  }
}