/**
 * order 240
 */
export default {
  regExp: /^flex-wrap-(?<value>inherit|initial|nowrap|wrap|wrap-reverse)$/,
  render ({ groups }) {
    const { value } = groups
    return { name: 'flexWrap', order: 240, css: [`flex-wrap: ${value}`] }
  }
}
