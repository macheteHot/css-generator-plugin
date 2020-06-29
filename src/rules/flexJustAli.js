/**
 * order 200
 */
const { JUSTIFY_CONTENT_ENMU_STR, ALIGN_ITEMS_ENMU_STR } = require('../constant')
module.exports = {
  regExp: new RegExp(`^flex-(?<justify>${JUSTIFY_CONTENT_ENMU_STR})-(?<align>${ALIGN_ITEMS_ENMU_STR})$`),
  render ({ groups }) {
    const { justify, align } = groups
    return {
      name: 'flexJustAli',
      order: 200,
      css: [`justify-content: ${justify}`, `align-items: ${align}`]
    }
  }
}
