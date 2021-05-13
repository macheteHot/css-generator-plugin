/**
 * order 40
 */
import { UNIT_ENUM_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'

export default {
  regExp: new RegExp(`^(min-h|min-height)-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?$`),
  render ({ groups }) {
    const { num, unit } = groups
    return { name: 'min-height', order: 40, num, css: [`min-height: ${num}${unit}`] }
  }
}
