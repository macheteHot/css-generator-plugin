/**
 * order 310
 */
import { UNIT_ENMU_STR } from '../constant'
import { getUnit } from '../config'

export default {
  regExp: new RegExp(`^(?<direction>[trbl]|top|right|bottom|left)-(?<isMinus>m-)?(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { direction, isMinus, num, unit } = groups
    if (isMinus) {
      num = 0 - num
    }
    unit = getUnit(unit)
    if (direction === 't') {
      direction = 'top'
    }
    if (direction === 'r') {
      direction = 'right'
    }
    if (direction === 'b') {
      direction = 'bottom'
    }
    if (direction === 'l') {
      direction = 'left'
    }
    const base = { name: 'orientation', order: 310, num }
    return num === 0
      ? { ...base, css: [`${direction}: 0`] }
      : { ...base, css: [`${direction}: ${num}${unit}`] }
  }
}
