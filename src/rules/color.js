/**
 * order Infinity
 */

import { getColorsKey, textToRgbText } from '../colorUtils'

export default {
  regExp: () => new RegExp(
    `^(?<type>color|c|text|bg|background|border-color|border-c)-((?<pseudo>hover|link|visited|active|focus|focus-within)-)?(?<color>[a-fA-F0-9]{6}|[a-fA-F0-9]{3}|${getColorsKey().join('|')})(-(?<opacity>1|([1-9]\\d{0,1})))?$`),
  render ({ groups }) {
    let { type, pseudo, color, opacity } = groups
    opacity = opacity === undefined ? 1 : (opacity * 0.01).toFixed(2)
    color = textToRgbText(color, opacity) // rgba(xxxx) or transparent
    let perfix = ''
    switch (type) {
      case 'c':
      case 'color':
      case 'text':
        perfix = 'color'
        break
      case 'bg':
      case 'background':
        perfix = 'background-color'
        break
      case 'border-c':
      case 'border-color':
        perfix = 'border-color'
        break
      default:
        perfix = type
        break
    }
    // put pesudo maybe undefind or string
    return { name: 'color', order: Infinity, pseudo, css: [`${perfix}: ${color}`] }
  }
}
