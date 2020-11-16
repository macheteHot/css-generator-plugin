/**
 * order 370
 */
import { UNIT_ENMU_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'

export default {
  regExp: new RegExp(`^(font-size|fs)-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(unit)
    const base = { name: 'fontSize', order: 370, num }
    return Number(num) === 0
      ? { ...base, css: ['font-size: 0'] }
      : { ...base, css: [`font-size: ${num}${unit}`] }
  }
}
