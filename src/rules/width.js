/**
 * order 10
 */
import { UNIT_ENMU_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'
export default {
  regExp: new RegExp(`^(w|width)-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    const { num, unit } = groups
    const base = { name: 'width', order: 10, num }
    return Number(num) === 0
      ? { ...base, css: ['width: 0'] }
      : { ...base, css: [`width: ${num}${getUnit(unit)}`] }
  }
}
