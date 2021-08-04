
/**
 * order 590
 */
import { toRegexStr } from '../constant'
const list = ['visible', 'hidden', 'collapse', 'inherit', 'initial', 'revert', 'unset']
export default {
  regExp: new RegExp(`^visibility-(?<value>${toRegexStr(list)})$`),
  render ({ groups }) {
    const { value } = groups
    return { name: 'visibility', order: 590, css: [`visible-${value}: ${value}`] }
  }
}
