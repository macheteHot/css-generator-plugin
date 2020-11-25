/**
 * order Infinity
 */
export default {
  regExp: /^opacity-(?<num>([1-9]?\d|100))$/,
  render ({ groups }) {
    const { num } = groups
    return { name: 'opacity', order: Infinity, num, css: [`opacity: ${Number((num / 100).toFixed(2))}`] }
  }
}
