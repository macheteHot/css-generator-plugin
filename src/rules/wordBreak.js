/**
 * order 350
 */

module.exports = {
  regExp: /^word-break-(?<value>normal|break-all|keep-all|break-word|inherit|initial|unset)$/,
  render ({ groups }) {
    const { value } = groups
    return {
      name: 'wordBreak',
      order: 350,
      css: [`word-break: ${value}`]
    }
  }
}
