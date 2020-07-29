const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

function resolve (...args) {
  return path.resolve(__dirname, ...args)
}

const output = {
  path: resolve('../dist'),
  filename: 'gcss.js'
}

const config = {
  mode: 'production',
  entry: resolve('../src/scriptUse.js'),
  devtool: 'none',
  output
}

webpack(config, (err) => {
  if (err) {
    console.error(err)
  } else {
    fs.copyFileSync(resolve(output.path, output.filename), resolve('../docs/', output.filename))
  }
})
