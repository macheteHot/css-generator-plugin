/**
 * order 280
 */
import { UNIT_ENMU_STR } from '../constant'
import { getUnit } from '../config'

export default {
  regExp: new RegExp(`^flex-basis-(?<value>((?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?)|initial|inherit|auto)$`),
  render ({ groups }) {
    let { value, num, unit } = groups
    if (num) {
      unit = getUnit(unit)
      value = `${num}${unit}`
    }
    return {
      name  : 'flexBasis',
      order : 280,
      css   : [`flex-basis: ${value}`]
    }
  }
}
