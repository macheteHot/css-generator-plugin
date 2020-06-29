/**
 * order 260-270
 */
module.exports = {
  regExp: /^flex-(?<type>shrink|grow)-(?<value>(0|[1-9]\d*)|initial|inherit)$/,
  render ({ groups }) {
    const { type, value } = groups
    return {
      name: type === 'shrink' ? 'flexShrink' : 'flexGrow',
      order: type === 'shrink' ? 260 : 270,
      css: [`flex-${type}: ${value}`]
    }
  }
}
