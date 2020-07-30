/**
 * order 420
 */

export default {
  regExp: /^(text-decoration|text)-(?<value>none|underline|overline|line-through|blink|inherit)$/,
  render ({ groups }) {
    const { value } = groups
    return {
      name: 'textDecoration',
      order: 420,
      css: [`text-decoration: ${value}`]
    }
  }
}
