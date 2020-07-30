/**
 * order 20
 */
import { UNIT_ENMU_STR } from '../constant'
import { getUnit } from '../config'

export default {
  regExp: new RegExp(`^(h|height)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    const { num, unit } = groups
    const base = { name: 'height', order: 20, num }
    return parseInt(num) === 0
      ? { ...base, css: ['height: 0'] }
      : { ...base, css: [`height: ${num}${getUnit(unit)}`] }
  }
}
