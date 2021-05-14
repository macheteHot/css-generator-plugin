import { PX_TO_REM } from '../constant'
import { getConfig } from '../config'

export function isFunction (payload) {
  return Object.prototype.toString.call(payload) === '[object Function]'
}

export function isObject (payload) {
  return Object.prototype.toString.call(payload) === '[object Object]'
}

export function groupBy (array, name) {
  const groups = {}
  array.forEach(function (o) {
    const group = JSON.stringify(o[name])
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  return Object.keys(groups).map(function (group) {
    return groups[group]
  })
}

export function getDirectionOrder (order, direction) {
  if (!direction) { return order }
  switch (direction) {
    case 'x':
      return order + 10
    case 'y':
      return order + 20
    case 't':
      return order + 30
    case 'b':
      return order + 40
    case 'r':
      return order + 50
    case 'l':
      return order + 60
  }
}

export function pxtorem (number) {
  const { rootValue = 16, unitPrecision = 5, minPixelValue = 1 } = getConfig(PX_TO_REM)

  const pixels = parseFloat(number)
  if (pixels < minPixelValue) return number

  const unitPrecisionTimes = Math.pow(10, unitPrecision)
  const v = Math.floor(pixels / rootValue * unitPrecisionTimes) / unitPrecisionTimes

  return v
}
