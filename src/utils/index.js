function isFunction (payload) {
  return typeof payload === 'function'
}

function groupBy (array, name) {
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

module.exports = {
  isFunction,
  groupBy
}
