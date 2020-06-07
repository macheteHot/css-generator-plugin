const { mock } = require('mockjs')
const fs = require('fs')
const path = require('path')
const { getRegList } = require('../bin/createReg')
const { getCss } = require('./utils')
const regObjList = getRegList()
regObjList.forEach(obj => {
  fs.writeFileSync(path.resolve(__dirname, `./css/${obj.className}.css`), '', { flag: 'w' })
  for (let i = 0; i < 100; i++) {
    const str = mock(obj.regExp)
    const cssStr = getCss(str)
    if (cssStr) {
      fs.writeFileSync(path.resolve(__dirname, `./css/${obj.className}.css`), `${cssStr}`, { flag: 'a' })
    }
  }
})
console.log('please check file in css folder ')
