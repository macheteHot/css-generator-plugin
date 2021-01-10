/**
 * order 20
 */
import { UNIT_ENUM_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'

export default {
  regExp: new RegExp(`^(h|height)-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?$`),
  render ({ groups }) {
    const { num, unit } = groups
    return {
      name  : 'height',
      order : 20,
      num,
      css   : [`height: ${num}${getUnit(num, unit)}`]
    }
  }
}
