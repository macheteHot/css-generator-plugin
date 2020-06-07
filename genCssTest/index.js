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
    fs.writeFileSync(path.resolve(__dirname, `./css/${obj.className}.css`), `/* ${str} */\n${cssStr}\n`, { flag: 'a' })
  }
})
