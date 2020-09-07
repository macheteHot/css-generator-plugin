import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import shebang from '@robmarr/rollup-plugin-shebang'
const configList = [
  {
    input: 'src/scriptUse.js',
    output: {
      file: 'dist/gcss.js',
      format: 'iife'
    }
  },
  {
    input: 'src/webpackUse.js',
    output: {
      file: 'dist/webpackUse.js',
      format: 'cjs'
    }
  },
  {
    input: 'src/benuse.js',
    output: {
      file: 'dist/benuse-return.cli',
      format: 'cjs'
    },
    plugins: [
      json(),
      terser(),
      shebang()
    ]
  },
  {
    input: 'src/cliUse.js',
    output: {
      file: 'dist/css-generator',
      format: 'cjs'
    },
    plugins: [
      json(),
      terser(),
      shebang()
    ]
  },
  {
    input: 'src/genSnippets.js',
    output: {
      file: 'dist/genSnippets',
      format: 'cjs'
    },
    plugins: [
      json(),
      terser(),
      shebang()
    ]
  }
]
const defaultConfig = {
  plugins: [
    json(),
    terser()
  ]
}

export default configList.map(config => ({
  ...defaultConfig,
  ...config
}))
