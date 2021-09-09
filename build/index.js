const packageJSON = require('../package.json')
const fs = require('fs')
const path = require('path')

function resolve (pathStr) {
  return path.resolve(__dirname, pathStr)
}
const mdFileList = fs
  .readdirSync(resolve('../'), { withFileTypes: true, encoding: 'utf-8' })
  .reduce((t, c) => {
    if (c.isFile() && /\.md$/.test(c.name)) {
      t.push(path.resolve(c.name))
    }
    return t
  }, [])

function genMainFile () {
  const pathStr = resolve('../assets/packageJSON/')
  fs
    .readdirSync(pathStr, { withFileTypes: true, encoding: 'utf-8' })
    .forEach(item => {
      if (!item.isFile() || !/\.json$/.test(item.name)) { return null }
      const obj = require(path.resolve(pathStr, item.name))
      Object.entries(obj).forEach(([k, v]) => {
        if (v === '$VAR$') {
          obj[k] = packageJSON[k]
        }
      })
      const [, pathName] = item.name.match(/^(.*)\.json$/)
      console.log(`created package.json from ${item.name}`)
      mdFileList.forEach(mdFilePath => {
        const [, filename] = mdFilePath.match(/^.*\/(.+)$/)
        fs.copyFileSync(mdFilePath, resolve(`../dist/${pathName}/${filename}`))
      })
      fs.writeFileSync(resolve(`../dist/${pathName}/package.json`), JSON.stringify(obj, null, '\t'))
    })
}

genMainFile()
