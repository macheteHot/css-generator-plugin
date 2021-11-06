/**
 * order 290
 */
import { DISPLAY_STR } from '../constant'

export default {
  regExp: new RegExp(`^(display|d)-(?<value>${DISPLAY_STR})`),
  render ({ groups }) {
    const { value } = groups
    return {
      name  : 'display',
      order : Infinity,
      css   : [`display: ${value}`]
    }
  }
}
