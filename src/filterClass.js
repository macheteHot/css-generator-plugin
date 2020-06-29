
const cssSet = new Set() // 用来去重
const { getRegList } = require('./createReg')
// const { pushPreObj } = require('./preRender')
const { GLOB_REG } = require('./constant')
const { getConfig } = require('./config')

const { clearPreArray } = require('./preRender')

function filterClassNames (sourceStr) {
  cssSet.clear() // 清空set
  clearPreArray() // 清空预编译
  const classNameList = sourceStr.match(getConfig(GLOB_REG))
  if (classNameList) {
    classNameList.forEach(hasClassNameStr => {
      // 替换我们规则中不会出现的字符 替换成空格 注意前后必须有空格 可能导致拼接合法 会多生成几条 无所谓
      const className = hasClassNameStr.replace(/[^a-zA-Z0-9-]/g, ' ')
      className.split(' ').forEach(filterClass)
    })
  }
  return ''
}
function filterClass (classStr) {
  if (cssSet.has(classStr)) {
    return null
  }
  getRegList().forEach((rule) => {
    const res = classStr.match(rule.regExp)
    if (res !== null) {
      console.log(rule.render(res))
    }
  })
}

module.exports = {
  filterClassNames,
  filterClass
}
