/**
 * 50 - 180 order
 */
const { UNIT_ENMU_STR, DIRECTION_MAP } = require('../constant')
const { getUnit } = require('../config')

function getConfig (type, direction) {
  let order
  let name = ''
  if (type === 'm' || type === 'margin') {
    order = 50
    name += 'margin'
  }
  // 单项加 60 order m-l-10 最大为50 + 60 padding 从 120 起
  if (type === 'p' || type === 'padding') {
    order = 110
    name += 'padding'
  }
  if (direction === 'x') {
    order += 10
  }
  if (direction === 'y') {
    order += 20
  }
  if (direction === 't') {
    order += 30
  }
  if (direction === 'b') {
    order += 40
  }
  if (direction === 'r') {
    order += 50
  }
  if (direction === 'l') {
    order += 60
  }
  if (direction) {
    name += `-${direction}`
  }
  return { name, order }
}

const rule = {
  regExp: new RegExp(`^(?<type>m|margin|p|padding)-((?<direction>[trblxy])-)?(?<isMinus>m-)?(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { type, direction, isMinus, num, unit } = groups
    if (parseInt(num) === 0) {
      unit = ''
    } else {
      unit = getUnit(unit)
    }
    if (isMinus) {
      num = 0 - num
    }
    const baseConfig = getConfig(type, direction)
    if (type === 'm') {
      type = 'margin'
    }
    if (type === 'p') {
      type = 'padding'
    }
    return {
      ...baseConfig,
      num,
      css: DIRECTION_MAP
        .get(direction)
        .reduce((t, c) =>
          [...t, c ? `${type}-${c}: ${num}${unit}` : `${type}: ${num}${unit}`], [])
    }
  }
}

module.exports = rule
