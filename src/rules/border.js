/**
 * order 520 460 + 60
 */
const { UNIT_ENMU_STR, DIRECTION_MAP } = require('../constant')
const { getUnit } = require('../config')

function getOrder (direction) {
  let order = 460
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
  return order
}

function getCss (direction, num, unit) {
  return DIRECTION_MAP
    .get(direction)
    .reduce((t, c) => {
      if (c) {
        return [...t, `border-${c}-width: ${num}${unit}`, `border-${c}-style: solid`, `border-${c}-style: solid`]
      } else {
        return [...t, `border-width: ${num}${unit}`, 'border-style: solid', 'border-style: solid']
      }
    }, [])
}

module.exports = {
  regExp: new RegExp(`^(border|border-width|border-w)-((?<direction>[trblxy])-)?(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { direction, num, unit } = groups
    if (parseInt(num) === 0) {
      unit = ''
    } else {
      unit = getUnit(unit)
    }
    return {
      name: 'border',
      order: getOrder(direction),
      num,
      css: getCss(direction, num, unit)
    }
  }
}
