const path = require('path')
const rulesObjList = require('require-all')({
  dirname: path.join(__dirname, '/rules'),
  filter: /.*\.js$/
})
function getRegList () {
  return Object.values(rulesObjList)
}

const requireRules = require.context('./rules', false, /\.js$/)
function scriptgetRegList () {
  // return Object.values(rulesObjList)
  const list = requireRules.keys().map(requireRules)
  return list
}

module.exports = {
  getRegList,
  scriptgetRegList
}
