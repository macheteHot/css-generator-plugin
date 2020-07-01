/**
 * order 31
 */
const { UNIT_ENMU_STR } = require('../constant')
const { getUnit } = require('../config')
module.exports = {
  regExp: new RegExp(`^(max-w|max-width)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(unit)
    const base = { name: 'max-width', order: 31, num }
    return parseInt(num === 0)
      ? { ...base, css: ['max-width: 0'] }
      : { ...base, css: [`max-width: ${num}${unit}`] }
  }
}
