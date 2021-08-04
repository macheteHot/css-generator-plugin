/**
 * order Infinity
 */
export default {
  regExp: /^opacity-(?<value>([1-9]?\d|100))$/,
  render ({ groups }) {
    const { value } = groups
    return { name: 'opacity', order: Infinity, num: value, css: [`opacity: ${Number((value / 100).toFixed(2))}`] }
  }
}
