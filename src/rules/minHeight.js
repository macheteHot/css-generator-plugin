/**
 * order 40
 */
const { UNIT_ENMU_STR } = require('../constant')
const { getUnit } = require('../config')

module.exports = {
  regExp: new RegExp(`^(min-h|min-height)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(unit)
    const base = { name: 'min-height', order: 40, num }
    return parseInt(num === 0)
      ? { ...base, css: ['min-height: 0'] }
      : { ...base, css: [`min-height: ${num}${unit}`] }
  }
}
