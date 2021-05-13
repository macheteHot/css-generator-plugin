/**
 * order 530
 */
import { UNIT_ENUM_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'

export default {
  regExp: new RegExp(`^(border-radius|br)-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?$`),
  render ({ groups }) {
    const { num, unit } = groups
    return {
      name  : 'borderRadius',
      order : 530,
      num,
      css   : [`border-radius: ${num}${unit}`]
    }
  }
}
