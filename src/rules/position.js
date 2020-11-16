/**
 * order 300
 */

export default {
  regExp: /^position-(?<value>static|relative|sticky|unset|absolute|fixed|inherit|initial)$/,
  render ({ groups }) {
    const { value } = groups
    return {
      name  : 'position',
      order : 300,
      css   : [`position: ${value}`]
    }
  }
}
