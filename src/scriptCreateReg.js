
const requireRules = require.context('./rules', false, /\.js$/)

function getRegList () {
  return requireRules.keys().map(requireRules)
}
module.exports = {
  getRegList
}
