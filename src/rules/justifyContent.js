/**
 * order 210
 */
const { JUSTIFY_CONTENT_ENMU_STR } = require('../constant')
module.exports = {
  regExp: new RegExp(`^justify-content-(?<justify>${JUSTIFY_CONTENT_ENMU_STR})$`),
  render ({ groups }) {
    const { justify } = groups
    return { name: 'justifyContent', order: 210, css: [`justify-content: ${justify}`] }
  }
}
