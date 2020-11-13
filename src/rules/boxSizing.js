/**
 * order 560
 */

export default {
  regExp: /^box-sizing-(?<value>content-box|border-box)$/,
  render ({ groups }) {
    const { value } = groups
    return {
      name  : 'boxSizing',
      order : 560,
      css   : [`box-sizing: ${value}`]
    }
  }
}
