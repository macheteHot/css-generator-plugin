/**
 * order 320
 */

export default {
  regExp: /^(text-align|text)-(?<value>start|end|left|right|center|justify|match-parent)$/,
  render ({ groups }) {
    const { value } = groups
    return {
      name: 'textAlign',
      order: 320,
      css: [`text-align: ${value}`]
    }
  }
}
