const path = require('path')

function resolve (str) {
  return path.resolve(__dirname, str)
}

module.exports = {
  mode: 'production',
  entry: resolve('../src/scriptUse.js'),
  devtool: 'none',
  output: {
    path: resolve('../dist'),
    filename: 'gcss.js'
  },
  module: {
    // 高级正则不支持转es5
    // rules: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     loader: 'babel-loader',
    //     options: {
    //       presets: ['@babel/preset-env']
    //     }
    //   }
    // ]
  }
}
