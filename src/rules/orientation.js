/**
 * order 310
 */
import { UNIT_ENUM_STR, NONNEGATIVE_NUMBER_REGEX_STR, DIRECTION_MAP } from '../constant'

export default {
  regExp: new RegExp(`^(?<direction>[trbl]|top|right|bottom|left)-(?<isMinus>m-)?(?<num>${NONNEGATIVE_NUMBER_REGEX_STR})(?<unit>${UNIT_ENUM_STR})?$`),
  render ({ groups }) {
    let { direction, isMinus, num, unit } = groups
    if (isMinus) {
      num = 0 - num
    }
    // is only t r b l
    if (direction.length === 1) {
      direction = DIRECTION_MAP.get(direction)[0]
    }

    return { name: 'orientation', order: 310, num, css: [`${direction}: ${num}${unit}`] }
  }
}
