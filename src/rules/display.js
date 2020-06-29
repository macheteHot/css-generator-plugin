/**
 * order 290
 */

module.exports = {
  regExp: /^(display|d)-(?<value>none|inline|block|inline-block|flex)$/,
  render ({ groups }) {
    const { value } = groups
    return {
      name: 'display',
      order: 280,
      css: [`display: ${value}`]
    }
  }
}
