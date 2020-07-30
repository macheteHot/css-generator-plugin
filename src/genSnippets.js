const fs = require('fs')
const path = require('path')
const { getRegList } = require('../genSnippets')

function fwFile (str, flag) {
  fs.writeFileSync(path.resolve(process.cwd(), './auto-use-snippets.css'), str, {
    flag
  })
}
fwFile('', 'w')
const snippetStr = getRegList().reduce((t, c) => `${t}${c.render()}`, '')
fwFile(snippetStr, 'w')
