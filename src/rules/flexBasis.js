/**
 * order 280
 */
const { UNIT_ENMU_STR } = require('../constant')
const { getUnit } = require('../config')

module.exports = {
  regExp: new RegExp(`^flex-basis-(?<value>((?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?)|initial|inherit|auto)$`),
  render ({ groups }) {
    let { value, num, unit } = groups
    if (num) {
      unit = getUnit(unit)
      value = `${num}${unit}`
    }
    return {
      name: 'flexBasis',
      order: 280,
      css: [`flex-basis: ${value}`]
    }
  }
}
