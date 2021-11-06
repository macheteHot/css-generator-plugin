import { filterClassNamesByScriptUse } from './filterClass'
import { renderCss } from './preRender'
import { CSS_ANNOTATION, BEFORE_STR, AFTER_STR } from './constant'
import { setConfig, getConfig } from './config'

const NODE_ID = 'autocss'

const styleElement = document.createElement('style')
styleElement.rel = 'stylesheet'
styleElement.setAttribute('data-inline-style', NODE_ID)
const head = document.head || document.getElementsByTagName('head')[0]
head.appendChild(styleElement)

function genCss () {
  const sourceStr = document.body.innerHTML
  filterClassNamesByScriptUse(sourceStr)
  const oldStyleNode = document.getElementById(NODE_ID)
  if (oldStyleNode) {
    oldStyleNode.remove()
  }
  styleElement.innerHTML = `${getConfig(BEFORE_STR) || ''}\n${CSS_ANNOTATION}${renderCss()}${getConfig(AFTER_STR) || ''}`
}
export default class Gcss {
  constructor (cfg = {}) {
    setConfig({ ...cfg })
    this.str = ''
  }

  start () {
    genCss()
    const observer = new MutationObserver(genCss)
    observer.observe(document.body, {
      attributes      : true,
      attributeFilter : ['class'],
      childList       : true,
      subtree         : true
    })
  }

  static getCssStr () {
    return renderCss()
  }
}
