/**
 * order 41
 */
import { UNIT_ENMU_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'
export default {
  regExp: new RegExp(`^(min-w|min-width)-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(unit)
    const base = { name: 'min-width', order: 41, num }
    return Number(num === 0)
      ? { ...base, css: ['min-width: 0'] }
      : { ...base, css: [`min-width: ${num}${unit}`] }
  }
}
