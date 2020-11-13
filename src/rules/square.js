/**
 * order 50
 */
import { UNIT_ENMU_STR } from '../constant'
import { getUnit } from '../config'
export default {
  className : 'square',
  regExp    : new RegExp(`^square-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(unit)
    const base = { name: 'square', order: 50, num }
    return parseInt(num === 0)
      ? { ...base, css: ['width: 0', 'height: 0'] }
      : { ...base, css: [`width: ${num}${unit}`, `height: ${num}${unit}`] }
  }
}
