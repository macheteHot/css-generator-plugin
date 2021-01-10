/**
 * order 31
 */
import { UNIT_ENUM_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'
export default {
  regExp: new RegExp(`^(max-h|max-height)-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(num, unit)
    const base = { name: 'max-height', order: 31, num }
    return Number(num === 0)
      ? { ...base, css: ['max-height: 0'] }
      : { ...base, css: [`max-height: ${num}${unit}`] }
  }
}
