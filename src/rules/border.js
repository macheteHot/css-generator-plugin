/**
 * order 520 460 + 60
 */
import { UNIT_ENUM_STR, DIRECTION_MAP, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'
import { getDirectionOrder } from '../utils/index'

const getOrder = direction => getDirectionOrder(460, direction)

function getCss (direction, num, unit) {
  return DIRECTION_MAP
    .get(direction)
    .reduce((t, c) => {
      if (c) {
        return [...t, `border-${c}-width: ${num}${unit}`, `border-${c}-style: solid`, `border-${c}-color: rgba(0,0,0,1)`]
      } else {
        return [...t, `border-width: ${num}${unit}`, 'border-style: solid', 'border-color: rgba(0,0,0,1)']
      }
    }, [])
}

export default {
  regExp: new RegExp(`^(border|border-width|border-w)-((?<direction>[trblxy])-)?(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?$`),
  render ({ groups }) {
    let { direction, num, unit } = groups
    unit = getUnit(num, unit)
    return {
      name  : direction ? `border-${direction}` : 'border',
      order : getOrder(direction),
      num,
      css   : getCss(direction, num, unit)
    }
  }
}
