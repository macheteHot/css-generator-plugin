import { pushPreObj, clearPreArray, renderCss } from './preRender'
import { isFunction } from './utils/index.js'
import { setConfig } from './config'
import * as rules from './rules/index'

const NODE_ID = 'autocss'
const cssSet = new Set()

function getClass () {
  cssSet.clear()
  clearPreArray() // 清空预编译
  const sourceStr = document.body.innerHTML
  const reg = /((?<=class=(["']))[\s\S]*?(?=\2))/gi
  const classNameList = sourceStr.match(reg)
  if (classNameList) {
    classNameList.forEach(hasClassNameStr => {
      const className = hasClassNameStr.replace(/[^a-zA-Z0-9-]/g, ' ')
      className.split(' ').forEach(filterClass)
    })
  }
  return null
}

function filterClass (classStr) {
  if (cssSet.has(classStr)) {
    return null
  }
  cssSet.add(classStr)
  Object.values(rules).forEach((rule) => {
    const reg = isFunction(rule.regExp) ? rule.regExp() : rule.regExp
    const res = classStr.match(reg)
    if (res !== null) {
      pushPreObj({
        classStr,
        ...rule.render(res)
      })
    }
  })
}

function getCssStr () {
  getClass()
  return renderCss()
}

function genCss () {
  const cssStr = getCssStr()
  const oldStyleNode = document.getElementById(NODE_ID)
  if (oldStyleNode) {
    oldStyleNode.remove()
  }
  const style = document.createElement('style')
  style.type = 'text/css'
  style.rel = 'stylesheet'
  style.setAttribute('id', NODE_ID)
  style.appendChild(document.createTextNode(cssStr))
  document.getElementsByTagName('head')[0].appendChild(style)
}

window.Gcss = class {
  constructor (cfg = {}) {
    setConfig(cfg)
    this.str = ''
  }

  start () {
    genCss()
    // eslint-disable-next-line no-undef
    const observer = new MutationObserver(genCss)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
      childList: true,
      subtree: true
    })
  }
}

window.getCssStr = getCssStr
