/**
 * order 190
 */
export default {
  regExp: /^z-index-(?<isMinus>m-)?(?<value>0|[1-9]\d*)$/,
  render ({ groups }) {
    let { isMinus, value } = groups
    if (isMinus) {
      value = 0 - value
    }
    return { name: 'zIndex', order: 190, num: value, css: [`z-index: ${value}`] }
  }
}
