
const cssSet = new Set() // 用来去重
const { getRegList } = require('./createReg')
const { pushPreObj, clearPreArray } = require('./preRender')
const { GLOB_REG } = require('./constant')
const { getConfig } = require('./config')

const { isFunction } = require('lodash')

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
  cssSet.add(classStr)
  getRegList().forEach((rule) => {
    // regExp maybe function
    const reg = isFunction(rule.regExp) ? rule.regExp() : rule.regExp
    const res = classStr.match(reg)
    if (res !== null) {
      pushPreObj({ classStr, ...rule.render(res) })
    }
  })
}

module.exports = {
  filterClassNames,
  filterClass
}
