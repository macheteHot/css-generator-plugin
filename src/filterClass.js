
// 用来去重
import * as rules from './rules/index'
import { pushPreObj, pushQuery, pxtorem } from './preRender'
import { GLOB_REG, MODIFY_RULES, BASE_MEDIA_QUERY_KEY, MEDIA_QUERIES, PSEUDO_STR, PX_TO_REM } from './constant'
import { getConfig, getUnit } from './config'
import { isFunction } from './utils/index'
const cssSet = new Set()
const handleCssPipe = new Set()

export function initHandleCssPipe () {
  const pxtoremConfig = getConfig(PX_TO_REM)

  if (pxtoremConfig && typeof pxtoremConfig === 'object') {
    handleCssPipe.add(pxtorem)
  }
}

export function filterClassNames (sourceStr) {
  // cssSet.clear() // 清空set
  // clearPreArray() // 清空预编译
  const classNameList = sourceStr.match(getConfig(GLOB_REG))
  if (classNameList) {
    classNameList.forEach(hasClassNameStr => {
      // 替换我们规则中不会出现的字符 替换成空格 注意前后必须有空格 可能导致拼接合法 会多生成几条 无所谓
      const className = hasClassNameStr.replace(/[^a-zA-Z0-9-@:#.]/g, ' ')
      className.split(' ').forEach(filterClass)
    })
  }
  return ''
}

export function filterClass (classStr) {
  if (cssSet.has(classStr)) {
    return null
  }
  let query; let pseudo; let source = classStr
  const queryNames = [...BASE_MEDIA_QUERY_KEY, ...Object.keys(getConfig(MEDIA_QUERIES))]
  if (/[@:]/.test(classStr)) {
    const queryAndPesudoRegex = new RegExp(`^(?:(?<query>${queryNames.join('|')})@)?(?:(?<pseudo>${PSEUDO_STR}):)?(?<source>[^:@]+)$`)
    const res = classStr.match(queryAndPesudoRegex)
    if (!res) {
      return null
    }
    const { groups = null } = res
    if (!groups) {
      return null
    }
    ({ query, pseudo, source } = groups)
  }

  cssSet.add(classStr)
  const ruleList = Object.values({ ...rules, ...getConfig(MODIFY_RULES) })
  for (let i = 0; i < ruleList.length; i++) {
    let rule = ruleList[i]
    rule = isFunction(rule) ? rule({ getUnit }) : rule
    const reg = isFunction(rule.regExp) ? rule.regExp() : rule.regExp
    const res = source.match(reg)
    if (res !== null) {
      let renderResult = rule.render(res)

      handleCssPipe.forEach(handle => {
        renderResult = handle(renderResult)
      })

      const params = {
        classStr,
        ...renderResult,
        pseudo
      }

      if (query) {
        pushQuery(query, params)
      } else {
        pushPreObj(params)
      }
      break
    }
  }
}
