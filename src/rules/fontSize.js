/**
 * order 370
 */
import { UNIT_ENUM_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'

export default {
  regExp: new RegExp(`^(font-size|fs)-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(num, unit)
    return { name: 'fontSize', order: 370, num, css: [`font-size: ${num}${unit}`] }
  }
}
