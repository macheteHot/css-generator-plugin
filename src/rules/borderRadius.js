/**
 * order 530
 */
const { UNIT_ENMU_STR } = require('../constant')
const { getUnit } = require('../config')

module.exports = {
  regExp: new RegExp(`^(border-radius|br)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(unit)
    return {
      name: 'borderRadius',
      order: 530,
      css: parseInt(num) === 0 ? ['border-radius: 0'] : [`border-radius: ${num}${unit}`]
    }
  }
}
