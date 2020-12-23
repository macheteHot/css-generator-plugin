/**
 * order 530
 */
import { UNIT_ENMU_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'

export default {
  regExp: new RegExp(`^(border-radius|br)-(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { num, unit } = groups
    unit = getUnit(unit)
    return {
      name  : 'borderRadius',
      order : 530,
      num,
      css   : Number(num) === 0 ? ['border-radius: 0'] : [`border-radius: ${num}${unit}`]
    }
  }
}
