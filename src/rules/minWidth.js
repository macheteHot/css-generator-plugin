/**
 * order 41
 */
import { UNIT_ENUM_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'
export default {
  regExp: new RegExp(`^(min-w|min-width)-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?$`),
  render ({ groups }) {
    const { num, unit } = groups
    return { name: 'min-width', order: 41, num, css: [`min-width: ${num}${getUnit(num, unit)}`] }
  }
}
