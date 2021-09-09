import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import shebang from '@robmarr/rollup-plugin-shebang'
import rollupResolve from '@rollup/plugin-node-resolve'

const configList = [
  {
    input  : 'src/viteUse.js',
    output : {
      file   : 'dist/vite/viteUse.js',
      format : 'cjs'
    }
  },
  {
    input  : 'src/scriptUse.js',
    output : [
      {
        file   : 'dist/webpack/gcss.js',
        format : 'iife'
      },
      {
        file   : 'dist/vite/gcss.js',
        format : 'iife'
      }
    ]
  },
  {
    input  : 'src/webpackUse.js',
    output : {
      file   : 'dist/webpack/webpackUse.js',
      format : 'cjs'
    }
  },
  {
    input  : 'src/cliUse.js',
    output : {
      file   : 'dist/webpack/css-generator',
      format : 'cjs'
    },
    plugins: [
      shebang()
    ]
  },
  {
    input  : 'src/genSnippets.js',
    output : [
      {
        file   : 'dist/webpack/genSnippets',
        format : 'cjs'
      },
      {
        file   : 'dist/vite/genSnippets',
        format : 'cjs'
      }
    ],
    plugins: [
      shebang()
    ]
  }
]

export default configList.map(config => ({
  ...config,
  plugins: [
    json(),
    terser(),
    rollupResolve(),
    ...config.plugins ?? []
  ]
}))
