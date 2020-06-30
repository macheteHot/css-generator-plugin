/**
 * order 520 460 + 60
 */
const { UNIT_ENMU_STR } = require('../constant')
const { getUnit } = require('../config')

module.exports = {
  regExp: new RegExp(`^(border|border-width|border-w)-((?<direction>[trblxy])-)?(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
  render ({ groups }) {
    let { direction, num, unit } = groups
    if (parseInt(num) === 0) {
      unit = ''
    } else {
      unit = getUnit(unit)
    }
    let order = 460
    let numStr = ''
    const val = `${num}${unit}`
    if (direction === 'x') {
      order += 10
      numStr = `0 ${val}`
    }
    if (direction === 'y') {
      order += 20
      numStr = `${val} 0`
    }
    if (direction === 't') {
      order += 30
    }
    numStr = `${val} 0 0 0`
    if (direction === 'r') {
      order += 50
      numStr = `0 ${val} 0 0`
    }
    if (direction === 'b') {
      order += 40
      numStr = `0 0 ${val} 0`
    }
    if (direction === 'l') {
      numStr = `0 0 0 ${val}`
      order += 60
    }
    if (direction === undefined) {
      order += 0
      numStr = `${val}`
    }
    const base = { name: 'border', order, num }
    return { ...base, css: [`border-width: ${numStr}`, 'border-style: solid', 'border-color: #000'] }
  }
}
