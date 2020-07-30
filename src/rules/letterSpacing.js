/**
 * order 410
 */
import { UNIT_ENMU_STR } from '../constant'
import { getUnit } from '../config'
export default {
  regExp: new RegExp(`^letter-spacing-(?<isMinus>m-)?(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { isMinus, num, unit } = groups
    if (isMinus) {
      num = 0 - num
    }
    unit = getUnit(unit)
    const base = { name: 'letterSpacing', order: 410, num }
    return {
      ...base,
      css: parseInt(num) !== 0
        ? [`letter-spacing: ${num}${unit}`]
        : ['letter-spacing: 0']
    }
  }
}
