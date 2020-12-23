/**
 * order 360
 */
export default {
  regExp: /^(font-weight|fw)-(?<value>[1-9]00|normal|bold|bolder|inherit|initial|lighter|normal|unset)$/,
  render ({ groups }) {
    const { value } = groups
    return {
      name  : 'fontWeight',
      order : 360,
      css   : [`font-weight: ${value}`]
    }
  }
}
