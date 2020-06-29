/**
 * order 240
 */
module.exports = {
  regExp: /^flex-wrap-(?<value>inherit|initial|nowrap|wrap|wrap-reverse)$/,
  render ({ groups }) {
    const { value } = groups
    return { name: 'flexDirection', order: 240, css: [`flex-wrap: ${value}`] }
  }
}
