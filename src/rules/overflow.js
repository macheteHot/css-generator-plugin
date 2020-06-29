/**
 * order 380 - 400
 */

module.exports = {
  regExp: /^overflow(-(?<direction>x|y))?-(?<value>hidden|auto|visible|scroll|inherit)$/,
  render ({ groups }) {
    const { direction, value } = groups
    const base = { name: 'overflow' }
    if (!direction) {
      return { ...base, order: 380, css: [`overflow: ${value}`] }
    }
    if (direction === 'x') {
      return { ...base, order: 390, css: [`overflow-x: ${value}`] }
    }
    if (direction === 'y') {
      return { ...base, order: 400, css: [`overflow-y: ${value}`] }
    }
  }
}
