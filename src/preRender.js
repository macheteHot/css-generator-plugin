import { IMPORTANT, MEDIA_QUERIES, BASE_MEDIA_QUERY, PX_TO_REM } from './constant'
import { groupBy } from './utils/index'
import { getConfig } from './config'

const pxRegExp = /"[^"]+"|'[^']+'|url\([^)]+\)|var\([^)]+\)|(\d*\.?\d+)px/g
let preArray = []
const queryObj = { }

export function pushPreObj (obj) {
  return preArray.push(obj)
}

export function getPreArray () {
  return preArray
}

export function clearPreArray () {
  preArray = []
}

export function pushQuery (key, obj) {
  // if queryObj has key then push else set key is Array
  if (Object.prototype.hasOwnProperty.call(queryObj, key)) {
    queryObj[key].push(obj)
  } else {
    queryObj[key] = [obj]
  }
}

const isImportant = () => getConfig(IMPORTANT)
function getCssSingle ({ classStr, css, pseudo }) {
  classStr = classStr.replace(/([@:#.])/g, '\\$1')
  if (pseudo) {
    classStr = classStr + `:${pseudo}`
  }
  return css.reduce((t, c) => t + (isImportant() ? `${c} !important; ` : `${c}; `), `.${classStr}{ `) + '}'
}

function sortCss (a, b) {
  if (a !== undefined && b !== undefined) {
    return Number(a.num) - Number(b.num)
  } else {
    return 0
  }
}

function renderArray (array) {
  let cssStr = ''
  const cssObject = groupBy(array.sort((a, b) => a.order - b.order), 'name')
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

export function renderCss () {
  let cssStr = ''
  cssStr += renderArray(preArray)
  const queryConfigObj = { ...BASE_MEDIA_QUERY, ...getConfig(MEDIA_QUERIES) }
  for (const key in queryObj) {
    if (Object.prototype.hasOwnProperty.call(queryObj, key)) {
      cssStr += `@media ${queryConfigObj[key]}{\n`
      cssStr += renderArray(queryObj[key])
      cssStr += '}'
    }
  }
  return cssStr
}

export function pxtorem (config) {
  if (!Array.isArray(config.css)) return config

  const { rootValue = 16, unitPrecision = 5, minPixelValue = 1 } = getConfig(PX_TO_REM)
  const config1 = {
    ...config
  }

  config1.css = config1.css.map(css => {
    return css.replace(pxRegExp, (match, $1) => {
      if (!$1) return match
      const pixels = parseFloat($1)
      const unitPrecisionTimes = Math.pow(10, unitPrecision)

      if (pixels < minPixelValue) return match

      const v = Math.floor(pixels / rootValue * unitPrecisionTimes) / unitPrecisionTimes
      return v === 0 ? '0' : `${v}rem`
    })
  })

  return config1
}
