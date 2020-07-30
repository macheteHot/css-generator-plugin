/**
 * order 41
 */
import { UNIT_ENMU_STR } from '../constant'
import { getUnit } from '../config'
export default {
  regExp: new RegExp(`^(min-w|min-width)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(unit)
    const base = { name: 'min-width', order: 41, num }
    return parseInt(num === 0)
      ? { ...base, css: ['min-width: 0'] }
      : { ...base, css: [`min-width: ${num}${unit}`] }
  }
}
