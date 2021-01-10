/**
 * order 570
 */
import { VERTICAL_ALIGN_STR, UNIT_ENUM_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'

export default {
  regExp: new RegExp(`^vertical-align-(?<value>((?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?)|${VERTICAL_ALIGN_STR})$`),
  render ({ groups }) {
    let { value, num, unit } = groups
    if (num) {
      unit = getUnit(unit, unit)
      value = `${num}${unit}`
    }
    return {
      name  : 'verticalAlign',
      order : 570,
      css   : [`vertical-align: ${value}`]
    }
  }
}
