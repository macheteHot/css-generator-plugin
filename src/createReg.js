const path = require('path')
const rulesObjList = require('require-all')({
  dirname: path.join(__dirname, '/rules'),
  filter: /.*\.js$/
})
function getRegList () {
  return Object.values(rulesObjList)
}

module.exports = {
  getRegList
}
