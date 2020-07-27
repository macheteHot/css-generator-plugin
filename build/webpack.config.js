const path = require('path')

function resolve (str) {
  return path.resolve(__dirname, str)
}

module.exports = {
  mode: 'production',
  entry: resolve('../src/scriptUse.js'),
  devtool: 'source-map',
  output: {
    path: resolve('../dist'),
    filename: 'gcss.js'
  }
}
