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
webpack 或 vite 用户请 下载本项目中配置文件 **[.css.generator.js](./.css.generator.js)** 到项目根目录

cdn 或生成器用户 请在 函数中传入配置

```

### 命令行启动(如小程序类和老项目，无webpack)
+ 运行指令
```text
npx css-generator
  or
yarn css-generator

```
## [规则说明与进阶使用](./RULE.md)