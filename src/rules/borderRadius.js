/**
 * order 530
 */
import { UNIT_ENMU_STR } from '../constant'
import { getUnit } from '../config'

export default {
  regExp: new RegExp(`^(border-radius|br)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(unit)
    return {
      name: 'borderRadius',
      order: 530,
      css: parseInt(num) === 0 ? ['border-radius: 0'] : [`border-radius: ${num}${unit}`]
    }
  }
}
