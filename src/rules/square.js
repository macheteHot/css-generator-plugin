/**
 * order 50
 */
import { UNIT_ENMU_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'
export default {
  className : 'square',
  regExp    : new RegExp(`^square-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(unit)
    const base = { name: 'square', order: 50, num }
    return Number(num === 0)
      ? { ...base, css: ['width: 0', 'height: 0'] }
      : { ...base, css: [`width: ${num}${unit}`, `height: ${num}${unit}`] }
  }
}
