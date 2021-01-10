/**
 * order 330
 */
import { UNIT_ENUM_STR, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'

export default {
  regExp: new RegExp(`^(lh|line-height)-(?<value>((?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?)|normal|unset|inherit|initial)$`),
  render ({ groups }) {
    let { value, num, unit } = groups
    const base = { name: 'lineHeight', order: 330 }
    if (num !== undefined) { // 如果有数字 就转换单位
      unit = getUnit(num, unit)
      return { ...base, num, css: [`line-height: ${num}${unit}`] }
    }
    return { ...base, num: Infinity, css: [`line-height: ${value}`] }
  }
}
