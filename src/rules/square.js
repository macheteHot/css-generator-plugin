/**
 * order 50
 */
import { UNIT_ENUM_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'
export default {
  className : 'square',
  regExp    : new RegExp(`^square-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(num, unit)
    return { name: 'square', order: 50, num, css: [`width: ${num}${unit}`, `height: ${num}${unit}`] }
  }
}
