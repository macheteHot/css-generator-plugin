import { filterClassNames } from './filterClass'
import { renderCss } from './preRender'

import { setConfig } from './config'

const NODE_ID = 'autocss'

function genCss () {
  const sourceStr = document.body.innerHTML
  filterClassNames(sourceStr)
  const oldStyleNode = document.getElementById(NODE_ID)
  if (oldStyleNode) {
    oldStyleNode.remove()
  }
  const style = document.createElement('style')
  style.type = 'text/css'
  style.rel = 'stylesheet'
  style.setAttribute('id', NODE_ID)
  style.appendChild(document.createTextNode(renderCss()))
  document.getElementsByTagName('head')[0].appendChild(style)
}

window.Gcss = class {
  constructor (cfg = {}) {
    setConfig({ ...cfg, type: 'html' })
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

window.getCssStr = renderCss
