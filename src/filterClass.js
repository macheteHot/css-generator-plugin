
// 用来去重
import * as rules from './rules/index'
import { pushPreObj, clearPreArray } from './preRender'
import { GLOB_REG } from './constant'
import { getConfig } from './config'

const cssSet = new Set()

export function filterClassNames (sourceStr) {
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
export function filterClass (classStr) {
  if (cssSet.has(classStr)) {
    return null
  }
  cssSet.add(classStr)
  Object.values(rules).forEach((rule) => {
    // regExp maybe function
    const reg = typeof rule.regExp === 'function' ? rule.regExp() : rule.regExp
    const res = classStr.match(reg)
    if (res !== null) {
      pushPreObj({ classStr, ...rule.render(res) })
    }
  })
}
