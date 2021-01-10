/**
 * order 20
 */
import { UNIT_ENMU_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'

export default {
  regExp: new RegExp(`^(h|height)-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    const { num, unit } = groups
    const base = { name: 'height', order: 20, num }
    return Number(num) === 0
      ? { ...base, css: ['height: 0'] }
      : { ...base, css: [`height: ${num}${getUnit(unit)}`] }
  }
}
