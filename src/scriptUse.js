import { filterClassNamesByScriptUse } from './filterClass'
import { renderCss } from './preRender'

import { setConfig } from './config'

const NODE_ID = 'autocss'

const styleElement = document.createElement('style')

function genCss () {
  const sourceStr = document.body.innerHTML
  filterClassNamesByScriptUse(sourceStr)
  const oldStyleNode = document.getElementById(NODE_ID)
  if (oldStyleNode) {
    oldStyleNode.remove()
  }
  styleElement.rel = 'stylesheet'
  styleElement.setAttribute('data-inline-style', NODE_ID)
  styleElement.appendChild(document.createTextNode(renderCss()))
  const head = document.head || document.getElementsByTagName('head')[0]
  head.appendChild(styleElement)
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
}
