/**
 * order 190
 */
module.exports = {
  regExp: /^z-index-(?<isMinus>m-)?(?<num>0|[1-9]\d*)$/,
  render ({ groups }) {
    let { isMinus, num } = groups
    if (isMinus) {
      num = 0 - num
    }
    return { name: 'zIndex', order: 190, num, css: [`z-index: ${num}`] }
  }
}
