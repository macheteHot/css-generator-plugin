/**
 * order 210
 */
import { JUSTIFY_CONTENT_ENUM_STR } from '../constant'
export default {
  regExp: new RegExp(`^justify-content-(?<justify>${JUSTIFY_CONTENT_ENUM_STR})$`),
  render ({ groups }) {
    const { justify } = groups
    return { name: 'justifyContent', order: 210, css: [`justify-content: ${justify}`] }
  }
}
