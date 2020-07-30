/**
 * order 440
 */

export default {
  regExp: /^(text-align-last|text-last)-(?<value>auto|left|right|center|justify|start|end|initial|inherit)$/,
  render ({ groups }) {
    const { value } = groups
    return {
      name: 'textAlignLast',
      order: 440,
      css: [`text-align-last: ${value}`]
    }
  }
}
