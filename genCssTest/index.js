const fs = require('fs')
const path = require('path')
const { getRegList } = require('../src/createReg')
const regObjList = getRegList()
const cssList = require('./test.json')
// fs.writeFileSync(path.resolve(__dirname, './css/test.js'), '', { flag: 'w' })
const list = []
cssList.forEach(className => {
  regObjList.forEach(({ regExp, render }) => {
    const res = className.match(regExp)
    if (res) {
      list.push({ className, ...render(res) })
    }
  })
})
fs.writeFileSync(path.resolve(__dirname, './result.json'), JSON.stringify(list, null, 2), { flag: 'w' })
