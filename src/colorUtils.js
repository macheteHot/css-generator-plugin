const { getConfig } = require('./config')
const { COLORS } = require('./constant')
const colorStore = () => ({
  red: '#f00',
  white: '#fff',
  black: '#000',
  blue: '#00f',
  transparent: 'transparent',
  ...getConfig(COLORS)
})

function getColors () {
  return colorStore()
}

function getColorsKey () {
  return Object.keys(colorStore())
}

function radix16 (value) {
  return parseInt(value, 16)
}

function textToRgbText (str) {
  const hex = /^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(str)
    ? str
    : colorStore()[str].replace(/^#/, '')
  if (hex.length === 3) {
    return hex
      .split('')
      .map(_ => radix16(_.repeat(2)))
      .join(',')
  }
  if (hex.length === 6) {
    const reg = /[a-fA-F0-9]{2}/g
    return hex
      .match(reg)
      .map(radix16)
      .join(',')
  }
  if (hex === 'transparent') {
    return 'transparent'
  }
  return ''
}

module.exports = {
  getColors,
  getColorsKey,
  textToRgbText
}
