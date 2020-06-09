##### css-generator-plugin 自动生成css文件，高效开发页面

#### 如何使用

+ 安装依赖
```
 npm install css-generator-plugin -D
 yarn add css-generator-plugin -D
```

## webpack启动  
传入配置参数 或者 项目根目录配置css.generator.config.js/css.generator.config.json(文件名固定)
```javascript
const CssGeneratorPlugin = require('css-generator-plugin')
{
  // ... config settings here ...
  plugins: [
    new CssGeneratorPlugin({
      colors: {
        red: '#f00',
        white: '#fff',
        black: '#000',
        blue: '#00f',
        transparent: 'transparent',
      }, // 可选项。颜色配置，内置包含以上默认值
      dirPath: 'src', // 必填项。源码根目录（必须存在此目录）
      generate: 'src/style/auto.css', // 必填项。生成文件位置(不存在会自动创建目录)
      type: 'vue', // 必填项。项目类型 vue|d-mini-program
      unit: 'px', // 可选项。默认单位
      important: true // 可选项。默认为true。css是否添加！important
    })
  ]
};
```

## 命令行启动（如小程序类和老项目，无webpack）

+ 项目根目录配置css.generator.config.js/css.generator.config.json(文件名固定)
```javascript
module.exports = {
  colors: {}, // 可选项。颜色配置，内置包含以上默认值
  dirPath: 'src', // 必填项。源码根目录（必须存在此目录）
      generate: 'src/style/auto.css', // 必填项。生成文件位置(不存在会自动创建目录)
  type: 'vue', // 必填项。项目类型 vue|d-mini-program
  unit: 'px', // 可选项。默认单位
  important: true // 可选项。默认为true。css是否添加！important
}
```
+ 运行指令（建议配置到package.json的scripts）
```text
css-generator-plugin
```






##### 规则约定

### 伪类约定 
```text
+ 属性名后跟-(hover|link|visited|active|focus|focus-within)伪类，自动生成伪类选择器
+ 目前仅颜色类支持
```
### 方向约定 trblxy
```text
+ y代表上下tb x代表左右lr组合方向
+ tblr代表上下左右单方向
+ 权重优先级： tblr单项 > xy双向组合 > 四项组合
```
### 数值约定  
```text
+ m-16  16代表正数
+ m-m-16 -m-16代表负数（部分属性支持）
+ 数值全部不支持小数
```
### 单位约定  
```text
+ p为百分比%的缩写。默认不传为px
```
```javascript
const UNIT_ENMU = ['cm', 'mm', 'in', 'px', 'pt', 'pc', 'em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'p']
```
### 属性约定  
```text
+ 大部分属性符合key-value形式，部分属性会兼容简写，如dispaly-flex / d-flex
+ 部分属性为常用组合属性，如正方形 square-80（width:80px;height:80px） flex-center-center等
```
```javascript
[
  { // 宽或高 如：w-10p（width:10%） w-375（width:375px）
    className: 'widthOrHeight',
    regExp: new RegExp(`^[wh]-(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
  },
  { // 正方形简写 如：square-80（width:80px;height:80px）
    className: 'square',
    regExp: new RegExp(`^square-(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
  },
  { // 最大（小）宽（高） 如：min-w-300rem (min-width:300rem) max-h-100vh(max-height:100vh)
    className: 'minMaxWidthOrHeight',
    regExp: new RegExp(`^(min|max)-[wh]-(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
  },
  { //内外间距  如：m-16（margin:16px） p-x-24(padding-left:24px;padding-right:24px) m-b-32rem(margin-bottom:32rem)
    className: 'marginOrPadding',
    regExp: new RegExp(`^[mp]-(([trblxy])-)?(m-)?(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
  },
  { //图层高度  如：z-index-9（z-index:9）
    className: 'zIndex',
    regExp: /^z-index-(m-)?(0|[1-9]\d*)$/
  },
  { //flex  如：flex-1（flex:1） flex-none(flex:none)
    className: 'flexNum',
    regExp: /^flex-(null|auto|(0|[1-9]\d*))$/
  },
  { //文字水平对齐  如：text-align-center/text-center(text-align:center)
    className: 'text-align',
    regExp: /^(text-align|text)-(start|end|left|right|center|justify|match-parent)$/
  },
  { //行高  如：lh-14（line-height：14px）
    className: 'line-height',
    regExp: new RegExp(`^(lh|line-height)-(((0|[1-9]\\d*)(${UNIT_ENMU_STR})?)|normal|unset|inherit|initial)$`)
  },
  { // flex组合属性 如：flex-space-between-center(display:flex;justify-content:space-between;align-items:center)
    className: 'flex',
    regExp: new RegExp(`^flex-(${JUSTIFY_CONTENT_ENMU_STR})-(${ALIGN_ITEMS_ENMU_STR})$`)
  },
  { // flex主轴属性 如：justify-content-space-between(justify-content:space-between)
    className: 'justify-content',
    regExp: new RegExp(`^justify-content-(${JUSTIFY_CONTENT_ENMU_STR})$`)
  },
  { // flex次轴属性 如：align-items-center（align-items:center）
    className: 'align-items',
    regExp: new RegExp(`^align-items-(${ALIGN_ITEMS_ENMU_STR})$`)
  },
  { // flex轴方向 如：flex-direction-column(flex-direction:column)
    className: 'flex-direction',
    regExp: /^(flex-direction|flex)-(row|row-reverse|column|column-reverse)$/
  },
  { // 定位  如:position-relative(position:relative)
    className: 'position',
    regExp: /^position-(static|relative|sticky|unset|absolute|fixed|inherit|initial)$/
  },
  { // 方向定位  如：t-20vh（top:20vh）
    className: 'orientation',
    regExp: new RegExp(`^[trbl]-(m-)?(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
  },
  { // 鼠标样式 如：cursor-point（cursor：point）
    className: 'cursor',
    regExp: new RegExp(`^cursor-(${CURSOR_ENMU_STR})$`)
  },
  { // 文字折叠 如：word-break-break-all（word-break：break-all）
    className: 'word-break',
    regExp: /^word-break-(normal|break-all|keep-all|break-word|inherit|initial|unset)$/
  },
  { // 字体粗细 如：fw-bold(font-weight:bold)
    className: 'font-weight',
    regExp: /^(font-weight|fw)-([1-9]00|normal|bold|bolder|inherit|initial|lighter|normal|unset)$/
  },
  { // 字体大小 如：fs-12（font-size：12px）
    className: 'font-size',
    regExp: new RegExp(`^(font-size|fs)-(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
  },
  { // display 如:display-none(display:none)
    className: 'display',
    regExp: /^(display|d)-(none|inline|block|inline-block|flex)$/
  },
  { // overflow 如overflow-x-hidden（overflow-x：hidden）
    className: 'overflow',
    regExp: /^overflow(-[xy])?-(hidden|auto|visible|scroll|inherit)$/
  },
  { // 颜色相关  
    // 字体颜色 [color|c|text]-white  (color:white)
    // 背景色   [bg|background]-black (background:black)
    // 边框色   [border-color|border-c]-blue (border-color:blue)
    className: 'color',
    regExp: new RegExp(
      `^(color|c|text|bg|background|border-color|border-c)-((hover|link|visited|active|focus|focus-within)-)?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|${getColorsKey().join('|')})(-([1-9]\\d|100))?$`
    )
  },
  { // 字间距 如：letter-spacing-4（letter-spacing：4px）
    className: 'letter-spacing',
    regExp: new RegExp(`^letter-spacing-(m-)?(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
  },
  { // 组合属性，设置圆角变圆
    className: 'circle',
    regExp: /^circle$/,
    static: '.circle{border-radius:50%;}'
  },
  { // flex缩放 如：flex-grow-1(flex-grow:1) flex-shrink-0(flex-shrink:0)
    className: 'flexShrinkAndGrow',
    regExp: /^flex-(shrink|grow)-((0|[1-9]\d*)|initial|inherit)$/
  },
  { // flex占用轴空间 如：flex-basis-20%（flex-basis：20%）
    className: 'flex-basis',
    regExp: new RegExp(`^flex-basis-((0|[1-9]\\d*)(${UNIT_ENMU_STR})?|initial|inherit|auto)$`)
  },
  { // 边框宽度 这个宽度没有百分比 如：border-2(border-width:2px)
    className: 'border',
    regExp: new RegExp(`^(border|border-width|border-w)-([trblxy]-)?(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
  },
  { // 边框圆角 border-radius-4（border-radius：4px）
    className: 'border-radius',
    regExp: new RegExp(`^(border-radius|br)-(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
  },
  { // 边框类型 如：border-style-dashed（border-style：dashed）
    className: 'border-style',
    regExp: /^border-style-(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|inherit)$/
  },
  { // 最后一行文字对齐方式 如:text-align-last-right(text-align-last:right)
    className: 'text-align-last',
    regExp: /^(text-align-last|text-last)-(auto|left|right|center|justify|start|end|initial|inherit)$/
  },
  { // 文本修饰（下划线）如：text-decoration-underline（text-decoration：underline）
    className: 'text-decoration',
    regExp: /^(text-decoration|text)-(none|underline|overline|line-through|blink|inherit)$/
  },
  { // 鼠标选择 如：user-select-none(user-select:none)
    className: 'user-select',
    regExp: /^user-select-(none|auto|text|all|contain|element)$/
  },
  { // 简写-鼠标不可选
    className: 'select-none',
    regExp: /^select-none$/,
    static: '.select-none{user-select:none;}'
  },
  { //文字超出换行(num不写默认为1) 如：ellipsis-3（多行）|ellipsis  css代码见code
    className: 'text-ellipsis-num',
    regExp: /^(text-)?ellipsis-[1-9]\d*$/，
    css: '.text-ellipsis {overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;}'
  }
]
```