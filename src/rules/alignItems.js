/**
 * order 220
 */
import { ALIGN_ITEMS_ENUM_STR } from '../constant'
export default {
  regExp: new RegExp(`^align-items-(?<align>${ALIGN_ITEMS_ENUM_STR})$`),
  render ({ groups }) {
    const { align } = groups
    return { name: 'alignItems', order: 220, css: [`align-items: ${align}`] }
  }
}
