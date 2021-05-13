/**
 * order 280
 */
import { UNIT_ENUM_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'

export default {
  regExp: new RegExp(`^flex-basis-(?<value>((?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?)|initial|inherit|auto)$`),
  render ({ groups }) {
    let { value, num, unit } = groups
    if (num) {
      value = `${num}${unit}`
    }
    return {
      name  : 'flexBasis',
      order : 280,
      css   : [`flex-basis: ${value}`]
    }
  }
}
