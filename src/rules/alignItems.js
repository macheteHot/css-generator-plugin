/**
 * order 220
 */
const { ALIGN_ITEMS_ENMU_STR } = require('../constant')
module.exports = {
  regExp: new RegExp(`^align-items-(?<align>${ALIGN_ITEMS_ENMU_STR})$`),
  render ({ groups }) {
    const { align } = groups
    return { name: 'alignItems', order: 220, css: [`align-items: ${align}`] }
  }
}
