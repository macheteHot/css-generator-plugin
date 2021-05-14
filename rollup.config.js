import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import shebang from '@robmarr/rollup-plugin-shebang'
import rollupResolve from '@rollup/plugin-node-resolve'
const configList = [
  {
    input  : 'src/scriptUse.js',
    output : {
      file   : 'dist/gcss.js',
      format : 'iife'
    }
  },
  {
    input  : 'src/webpackUse.js',
    output : {
      file   : 'dist/webpackUse.js',
      format : 'cjs'
    }
  },
  {
    input  : 'src/cliUse.js',
    output : {
      file   : 'dist/css-generator',
      format : 'cjs'
    },
    plugins: [
      json(),
      terser(),
      shebang(),
      rollupResolve()

    ]
  },
  {
    input  : 'src/genSnippets.js',
    output : {
      file   : 'dist/genSnippets',
      format : 'cjs'
    },
    plugins: [
      json(),
      terser(),
      shebang(),
      rollupResolve()
    ]
  }
]
const defaultConfig = {
  plugins: [
    json(),
    terser(),
    rollupResolve()
  ]
}

export default configList.map(config => ({
  ...defaultConfig,
  ...config
}))
