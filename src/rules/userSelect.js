/**
 * order 430
 */

module.exports = {
  regExp: /^(user-)?select-(?<value>none|auto|text|all|contain|element)$/,
  render ({ groups }) {
    const { value } = groups
    return {
      name: 'userSelect',
      order: 430,
      css: [`user-select: ${value}`]
    }
  }
}
