/**
 * order 330
 */
import { UNIT_ENUM_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'

export default {
  regExp: new RegExp(`^(lh|line-height)-(?<value>((?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?)|normal|unset|inherit|initial)$`),
  render ({ groups }) {
    const { value, num = Infinity, unit } = groups
    const base = { name: 'lineHeight', order: 330 }
    if (num !== Infinity) {
      return { ...base, num, css: [`line-height: ${num}${unit}`] }
    }
    return { ...base, num, css: [`line-height: ${value}`] }
  }
}
