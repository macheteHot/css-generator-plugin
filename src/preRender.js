import { IMPORTANT } from './constant'
import { groupBy } from './utils/index'
import { getConfig } from './config'
let preArry = []

export function pushPreObj (obj) {
  return preArry.push(obj)
}

export function getPreArray () {
  return preArry
}

export function clearPreArray () {
  preArry = []
}

function getCssSingle ({ classStr, pseudo, css }) {
  if (pseudo) {
    classStr = classStr + `:${pseudo}`
  }
  return css.reduce((t, c, i) => {
    return t + (getConfig(IMPORTANT) ? `${c} !important; ` : `${c}; `)
  }, `.${classStr}{ `) + '}'
}

function sortCss (a, b) {
  if (a !== undefined && b !== undefined) {
    return parseInt(a.num) - parseInt(b.num)
  } else {
    return 0
  }
}

export function renderCss () {
  let cssStr = ''
  const cssObject = groupBy(preArry.sort((a, b) => a.order - b.order), 'name')
  for (const key in cssObject) {
    if (Object.prototype.hasOwnProperty.call(cssObject, key)) {
      cssStr += `/* ${cssObject[key][0].name || 'unknow name'} order ${cssObject[key][0].order} */\n`
      cssStr += cssObject[key]
        .sort(sortCss)
        .map(getCssSingle)
        .join('\n')
      cssStr += '\n\n'
    }
  }
  return cssStr
}
