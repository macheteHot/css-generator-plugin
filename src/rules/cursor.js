/**
 * order 340
 */
import { CURSOR_ENUM_STR } from '../constant'

export default {
  regExp: new RegExp(`^cursor-(?<value>${CURSOR_ENUM_STR})$`),
  render ({ groups }) {
    const { value } = groups
    return {
      name  : 'cursor',
      order : 340,
      css   : [`cursor: ${value}`]
    }
  }
}
