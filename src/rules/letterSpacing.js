/**
 * order 410
 */
import { UNIT_ENUM_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'
export default {
  regExp: new RegExp(`^letter-spacing-(?<isMinus>m-)?(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?$`),
  render ({ groups }) {
    let { isMinus, num, unit } = groups
    if (isMinus) {
      num = 0 - num
    }
    unit = getUnit(num, unit)
    const base = { name: 'letterSpacing', order: 410, num }
    return {
      ...base,
      css: Number(num) !== 0
        ? [`letter-spacing: ${num}${unit}`]
        : ['letter-spacing: 0']
    }
  }
}
