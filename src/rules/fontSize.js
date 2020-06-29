/**
 * order 370
 */
const { UNIT_ENMU_STR } = require('../constant')
const { getUnit } = require('../config')

module.exports = {
  regExp: new RegExp(`^(font-size|fs)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(unit)
    const base = { name: 'fontSize', order: 370, num }
    return parseInt(num) === 0
      ? { ...base, css: ['font-size: 0'] }
      : { ...base, css: [`font-size: ${num}${unit}`] }
  }
}
