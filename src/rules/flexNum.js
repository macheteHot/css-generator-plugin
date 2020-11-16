/**
 * order 250
 */

export default {
  regExp: /^flex-(?<value>null|auto|none|(0|[1-9]\d*))$/,
  render ({ groups }) {
    const { value } = groups
    return { name: 'flex', order: 250, css: [`flex: ${value}`] }
  }
}
