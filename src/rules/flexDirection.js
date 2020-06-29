/**
 * order 230
 */
module.exports = {
  regExp: /^(flex-direction|flex)-(?<value>row|row-reverse|column|column-reverse)$/,
  render ({ groups }) {
    const { value } = groups
    return { name: 'flexDirection', order: 230, css: [`flex-direction: ${value}`] }
  }
}
