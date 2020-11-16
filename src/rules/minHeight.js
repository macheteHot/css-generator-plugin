/**
 * order 40
 */
import { UNIT_ENMU_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'

export default {
  regExp: new RegExp(`^(min-h|min-height)-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(unit)
    const base = { name: 'min-height', order: 40, num }
    return Number(num === 0)
      ? { ...base, css: ['min-height: 0'] }
      : { ...base, css: [`min-height: ${num}${unit}`] }
  }
}
