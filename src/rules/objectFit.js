/**
 * order Infinity
 */

export default {
  regExp: /^(object-fit)-(?<value>fill|contain|cover|none|scale-down|inherit|initial|revert|unset)$/,
  render ({ groups }) {
    const { value } = groups
    return {
      name  : 'objectFit',
      order : Infinity,
      css   : [`object-fit: ${value}`]
    }
  }
}
