/**
 * order 450
 */

export default {
  regExp: /^(text-)?ellipsis(-(?<value>[1-9]\d*))?$/,
  render ({ groups }) {
    let { value } = groups
    const base = { name: 'ellipsis', order: 450 }
    if (Number(value) === 1) {
      value = undefined // 和没写是一样的
    }
    if (value === undefined) {
      return {
        ...base,
        num : 0,
        css : [
          'overflow: hidden',
          'text-overflow: ellipsis',
          'white-space: nowrap'
        ]
      }
    } else {
      return {
        ...base,
        num : value,
        css : [
          'overflow: hidden',
          'text-overflow: ellipsis',
          'display: -webkit-box',
          `-webkit-line-clamp: ${value}`,
          '-webkit-box-orient: vertical'
        ]
      }
    }
  }
}
