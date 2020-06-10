const { mock } = require('mockjs')
const fs = require('fs')
const path = require('path')
const { getRegList } = require('../src/createReg')
const { getCss } = require('./utils')
const regObjList = getRegList()
fs.writeFileSync(path.resolve(__dirname, './css/test.css'), '', { flag: 'w' })
regObjList.forEach(obj => {
  for (let i = 0; i < 300; i++) {
    const str = mock(obj.regExp)
    const cssStr = getCss(str)
    if (cssStr) {
      fs.writeFileSync(path.resolve(__dirname, './css/test.css'), `${cssStr}`, { flag: 'a' })
    }
  }
})
console.log('please check file in css folder ')
