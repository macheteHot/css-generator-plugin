/**
 * order 340
 */
import { CURSOR_ENMU_STR } from '../constant'

export default {
  regExp: new RegExp(`^cursor-(?<value>${CURSOR_ENMU_STR})$`),
  render ({ groups }) {
    const { value } = groups
    return {
      name: 'cursor',
      order: 340,
      css: [`cursor: ${value}`]
    }
  }
}
