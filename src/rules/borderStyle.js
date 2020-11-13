/**
 * order 550
 */

export default {
  regExp: /^border-style-(?<value>none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|inherit)$/,
  render ({ groups }) {
    const { value } = groups
    return {
      name  : 'borderStyle',
      order : 550,
      css   : [`border-style: ${value}`]
    }
  }
}
