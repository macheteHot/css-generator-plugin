# css-generator-plugin 自动生成css文件，高效开发页面

## [在线尝试](https://machetehot.github.io/css-generator-plugin/)

## [更新记录](./CHANGE.md)
### 如何使用

+ 安装依赖
  ## webpack 小程序用户
  ```shell
  npm i css-generator-plugin -D
    or
  yarn add css-generator-plugin -D
  ```
  ### webpack配置

  ```javascript
  const CssGeneratorPlugin = require('css-generator-plugin')
  {
    // ... other config settings 
    plugins: [
      new CssGeneratorPlugin()
    ]
  };
  ```
  在项目入口文件中引入 生成的css 
  ```js
  import '@/style/auto.css'
  ```
  ***
  ## vite 用户
  ```shell
  npm i vite-plugin-css-generator -D
    or
  yarn add vite-plugin-css-generator -D
  ```
  ### vite 配置
  ```javascript
  import CssGenerator from 'vite-plugin-css-generator'
  export default defineConfig({
    // ... other config settings 
    plugins:[
      CssGenerator()
    ]
  })
  ```
  在项目入口文件中引入 生成的css 
  ```js
  import '@/style/auto.css'
  ```
  ***
  ## 生成器 用户
  ```shell
  npm i css-generator-script
    or
  yarn add css-generator-script
  ```
  项目入口中引用
  ```js
  // Gcss(<配置项>) 写入配置项
  import Gcss from 'css-generator-script'
  new Gcss({}).start()
  ```
  ***
  ### CDN 引入
  ```html
  <html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/css-generator-script/gcss.js"></script>
  </head>
  <body>
  </body>
  <script>
    // {} is config
    new window.Gcss({}).start()
  </script>
  </html>
  ```
***
 ### 生成代码提示文件
  将会在根目录生成 auto-use-snippets.css 作为代码提示文件
  ```
  npx gen-snippets
   or
  yarn gen-snippets
  ```

### 配置项
webpack 或 vite 用户请在项目根目录创建 **css.generator.config.js** 文件

cdn 或生成器用户 请在 函数中传入配置

配置如下
```javascript
module.exports = {
  /**
   * 颜色配置 默认包含如下值
   * red         : '#f00'
   * white       : '#fff'
   * black       : '#000'
   * blue        : '#00f'
   * transparent : 'transparent'
   * 可以覆盖写入 相关颜色可自定义 如 bg-red bg-diy
   */
  colors: {},
  dirPath: 'src', // 插件用户必填项。源码根目录(必须存在此目录)
  generate: 'src/style/auto.css', // 插件用户必填项。生成文件位置(不存在会自动创建目录)
  // extNames: ['js','jsx','vue'] // 可选项。可以手动制定检测文件 如无特殊需求 只需指定type 即可
  type: 'vue', // 插件用户必填项。项目类型 vue | react | ali-mini-program (阿里系小程序) | wx-mini-program(微信小程序) | html 
  unit: 'px', // 可选项。默认单位px 如写 v 则必须配合 vToAny 使用
  /**
   * 可覆写规则 或自定义规则 详见进阶使用 详情请看README
   */
  modifyRules: {},
  /**
   * 自定义媒体查询
   * 可覆写或添加规则 以下为默认配置 如 md@bg-red or diy@bg-red
   * sm : '(min-width: 640px)',
   * md : '(min-width: 768px)',
   * lg : '(min-width: 1024px)',
   * xl : '(min-width: 1280px)'
   */
  mediaQueries: {},
  /**
   *  是否为所有css 添加 important 
   */
  important: true, // 
  /**
   * 可变单位 v 的转换方式 
   * 例如 w-10 => 10 / 16 =>  width: 0.625rem 
   */
  // vToAny: {
  //   unit: 'rem', // 默认转换后的单位
  //   rootValue: 16, // 表示根元素字体大小或基于输入参数返回根元素字体大小 1px -> 1/16rem
  //   unitPrecision: 5, // 允许小数单位精度
  //   minPixelValue: 1 // 不会被转换的最小值
  // }
}
```

### 命令行启动(如小程序类和老项目，无webpack)
+ 运行指令
```text
npx css-generator
  or
yarn css-generator

```
## [规则说明与进阶使用](./RULE.md)