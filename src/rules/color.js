/**
 * order Infinity
 */

import { getColorsKey, textToRgbText } from '../colorUtils'

export default {
  regExp: () => new RegExp(
    `^(?<type>color|c|text|bg|background|border-color|border-c)-(?<color>(#?([a-fA-F0-9]{8}$|[a-fA-F0-9]{6}|[a-fA-F0-9]{3}))|${getColorsKey().join('|')})(-(?<opacity>1|([1-9]\\d?)))?$`),
  render ({ groups }) {
    let { type, color, opacity } = groups
    opacity = opacity === undefined ? 1 : (opacity * 0.01).toFixed(2)
    color = textToRgbText(color, opacity) // rgba(xxxx) or transparent
    let prefix = ''
    switch (type) {
      case 'c':
      case 'color':
      case 'text':
        prefix = 'color'
        break
      case 'bg':
      case 'background':
        prefix = 'background-color'
        break
      case 'border-c':
      case 'border-color':
        prefix = 'border-color'
        break
      default:
        prefix = type
        break
    }
    return { name: 'color', order: Infinity, css: [`${prefix}: ${color}`] }
  }
}
