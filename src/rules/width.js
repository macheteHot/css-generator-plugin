/**
 * order 10
 */
const { UNIT_ENMU_STR } = require('../constant')
const { getUnit } = require('../config')
module.exports = {
  regExp: new RegExp(`^(w|width)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    const { num, unit } = groups
    const base = { name: 'width', order: 10, num }
    return parseInt(num) === 0
      ? { ...base, css: ['width: 0'] }
      : { ...base, css: [`width: ${num}${getUnit(unit)}`] }
  }
}
