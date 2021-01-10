/**
 * order 31
 */
import { UNIT_ENUM_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'
export default {
  regExp: new RegExp(`^(max-w|max-width)-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?$`),
  render ({ groups }) {
    const { num, unit } = groups
    return { name: 'max-width', order: 31, num, css: [`max-width: ${num}${getUnit(num, unit)}`] }
  }
}
