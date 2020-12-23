/**
 * order 31
 */
import { UNIT_ENMU_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'
export default {
  regExp: new RegExp(`^(max-w|max-width)-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(unit)
    const base = { name: 'max-width', order: 31, num }
    return Number(num === 0)
      ? { ...base, css: ['max-width: 0'] }
      : { ...base, css: [`max-width: ${num}${unit}`] }
  }
}
