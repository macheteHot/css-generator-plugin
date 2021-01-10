/**
 * order 200
 */
import { JUSTIFY_CONTENT_ENUM_STR, ALIGN_ITEMS_ENUM_STR } from '../constant'
export default {
  regExp: new RegExp(`^flex-(?<justify>${JUSTIFY_CONTENT_ENUM_STR})-(?<align>${ALIGN_ITEMS_ENUM_STR})$`),
  render ({ groups }) {
    let { justify, align } = groups
    if (justify === 'between') {
      justify = 'space-between'
    }
    if (justify === 'around') {
      justify = 'space-around'
    }
    if (justify === 'evenly') {
      justify = 'space-evenly'
    }
    return {
      name  : 'flexJustAli',
      order : 200,
      css   : ['display: flex', `justify-content: ${justify}`, `align-items: ${align}`]
    }
  }
}
