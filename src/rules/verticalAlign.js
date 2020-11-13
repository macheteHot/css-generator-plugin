/**
 * order 570
 */
import { VERTICAL_ALIGN_STR, UNIT_ENMU_STR } from '../constant'
import { getUnit } from '../config'

export default {
  regExp: new RegExp(`^vertical-align-(?<value>((?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?)|${VERTICAL_ALIGN_STR})$`),
  render ({ groups }) {
    let { value, num, unit } = groups
    if (num) {
      unit = getUnit(unit)
      value = `${num}${unit}`
    }
    return {
      name  : 'verticalAlign',
      order : 570,
      css   : [`vertical-align: ${value}`]
    }
  }
}
