export function isFunction (payload) {
  return typeof payload === 'function'
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
