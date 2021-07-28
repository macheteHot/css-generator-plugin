
/**
 * order 580
 */
import { GAP_ENUM_STR,NONNEGATIVE_NUMBER_REGEX_STR,UNIT_ENUM_STR } from '../constant';
export default {
  regExp: new RegExp(`^gap-(((?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?)|(?<value>${GAP_ENUM_STR}))$`),
  render ({ groups }) {
    let { num = Infinity, unit, value } = groups
    if (!value) { value  = num+unit }
    return { name: 'gap', order: 580, num, css: [`column-gap: ${value}`,`row-gap: ${value}`] }
  }
}
