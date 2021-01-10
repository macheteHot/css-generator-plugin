/**
 * order 520 460 + 60
 */
import { UNIT_ENUM_STR, DIRECTION_MAP, NONNEGATIVE_NUMBER_REGEX_STR } from '../constant'
import { getUnit } from '../config'
<<<<<<< HEAD
import { textToRgbText } from '../colorUtils'
=======
import { getDirectionOrder } from '../utils/index'
>>>>>>> v2.0

const getOrder = direction => getDirectionOrder(460, direction)

function getCss (direction, num, unit) {
  return DIRECTION_MAP
    .get(direction)
    .reduce((t, c) => {
      if (c) {
        return [
          ...t,
          `border-${c}-width: ${num}${unit}`,
          `border-${c}-style: solid`,
          `border-${c}-color: ${textToRgbText('000')}`
        ]
      } else {
        return [
          ...t,
          `border-width: ${num}${unit}`,
          'border-style: solid',
          `border-color: ${textToRgbText('000')}`
        ]
      }
    }, [])
}

export default {
  regExp: new RegExp(`^(border|border-width|border-w)-((?<direction>[trblxy])-)?(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?$`),
  render ({ groups }) {
    let { direction, num, unit } = groups
    unit = getUnit(num, unit)
    return {
      name  : 'border',
      order : getOrder(direction),
      num,
      css   : getCss(direction, num, unit)
    }
  }
}
