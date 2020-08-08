import { getConfig } from './config'
import { COLORS } from './constant'

const colorStore = () => ({
  red: '#f00',
  white: '#fff',
  black: '#000',
  blue: '#00f',
  transparent: 'transparent',
  ...getConfig(COLORS)
})

export function getColors () {
  return colorStore()
}

export function getColorsKey () {
  return Object.keys(colorStore())
}

function radix16 (value) {
  return parseInt(value, 16)
}

export function textToRgbText (str, opacity = 1) {
  const hex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(str) // is hex text or word
    ? str.replace(/^#/, '')
    : colorStore()[str].replace(/^#/, '')
  if (hex === 'transparent') {
    return 'transparent'
  }
  if (hex.length === 3) {
    return 'rgba(' + hex
      .split('')
      .map(x => radix16(x.repeat(2)))
      .join(',') +
      `,${opacity})`
  }
  if (hex.length === 6) {
    const reg = /[a-fA-F0-9]{2}/g
    return 'rgba(' + hex
      .match(reg)
      .map(radix16)
      .join(',') +
      `,${opacity})`
  }
  return ''
}
