/**
 * order 10
 */
import { UNIT_ENMU_STR } from '../constant'
import { getUnit } from '../config'
export default {
  regExp: new RegExp(`^(w|width)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    const { num, unit } = groups
    const base = { name: 'width', order: 10, num }
    return parseInt(num) === 0
      ? { ...base, css: ['width: 0'] }
      : { ...base, css: [`width: ${num}${getUnit(unit)}`] }
  }
}
