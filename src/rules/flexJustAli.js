/**
 * order 200
 */
const { JUSTIFY_CONTENT_ENMU_STR, ALIGN_ITEMS_ENMU_STR } = require('../constant')
module.exports = {
  regExp: new RegExp(`^flex-(?<justify>${JUSTIFY_CONTENT_ENMU_STR})-(?<align>${ALIGN_ITEMS_ENMU_STR})$`),
  render ({ groups }) {
    let { justify, align } = groups
    if (justify === 'between') {
      justify = 'space-between'
    }
    if (justify === 'around') {
      justify = 'space-around'
    }
    if (justify === 'evenly') {
      justify = 'space-evenly'
    }
    return {
      name: 'flexJustAli',
      order: 200,
      css: ['display: flex', `justify-content: ${justify}`, `align-items: ${align}`]
    }
  }
}
