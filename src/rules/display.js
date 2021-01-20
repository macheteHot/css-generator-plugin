/**
 * order 290
 */

export default {
  regExp: /^(display|d)-(?<value>none|inline|block|inline-block|flex|contents)$/,
  render ({ groups }) {
    const { value } = groups
    return {
      name  : 'display',
      order : Infinity,
      css   : [`display: ${value}`]
    }
  }
}
