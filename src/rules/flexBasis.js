/**
 * order 280
 */
import { UNIT_ENMU_STR } from '../constant'

module.exports = {
  regExp: new RegExp(`^flex-basis-(?<value>(0|[1-9]\\d*(${UNIT_ENMU_STR}))|initial|inherit|auto)$`),
  render ({ groups }) {
    const { value } = groups
    return {
      name: 'flexBasis',
      order: 280,
      css: [`flex-basis: ${value}`]
    }
  }
}
