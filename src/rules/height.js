/**
 * order 20
 */
const { UNIT_ENMU_STR } = require('../constant')
const { getUnit } = require('../config')

module.exports = {
  regExp: new RegExp(`^(h|height)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    const { num, unit } = groups
    const base = { name: 'height', order: 20, num }
    return parseInt(num) === 0
      ? { ...base, css: ['height: 0'] }
      : { ...base, css: [`height: ${num}${getUnit(unit)}`] }
  }
}
