/**
 * order 340
 */
const { CURSOR_ENMU_STR } = require('../constant')

module.exports = {
  regExp: new RegExp(`^cursor-(?<value>${CURSOR_ENMU_STR})$`),
  render ({ groups }) {
    const { value } = groups
    return {
      name: 'cursor',
      order: 340,
      css: [`cursor: ${value}`]
    }
  }
}
