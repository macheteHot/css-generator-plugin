# 生成规则

### 简写约定 
```text
+ m is margin
+ p is padding
+ h is height
+ w is width
```

### 方向约定 trblxy
```text
+ y代表上下tb x代表左右lr组合方向
+ tblr代表上下左右单方向
+ 权重优先级 tblr单项 > xy双向组合 > 四项组合
```

### 伪类约定 
```text
+ 伪类后跟任意属性
hover|link|visited|active|focus|focus-within 等伪类 后接属性 如 hover:c-red active:w-233
```

### 媒体查询约定
```text
内置三种媒体查询 如果需要覆盖或自定义添加 请看进阶使用
  sm : '(min-width: 640px)',
  md : '(min-width: 768px)',
  lg : '(min-width: 1024px)',
  xl : '(min-width: 1280px)'
  如 sm@bg-fff lg@w-2333 xl@m-t-10
  即可在不同屏幕大小中正确使用媒体查询支持全部属性 如需要与伪类配合使用 语法如下 <媒体查询>@<伪类>:<属性>
```

### 数值约定  
```text
+ m-16  16代表正数
+ m-m-16 -m-16代表负数(部分属性支持)
+ 数值全部支持小数 如 m-t-0.222vh w-33.333333p
```

### 单位约定  
```text
+ p为百分比%的缩写。默认不传为px
+ v为可变单位 例如 w-10 => 10 / 16 =>  width: 0.625rem (在配置文件中编写 <big>vToAny</big> 生效)
```
```javascript
const UNIT_ENUM = ['cm', 'mm', 'in', 'px', 'pt', 'pc', 'em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'p']
const UNIT_ENUM_STR = UNIT_ENUM.join('|')
```
### 属性约定  
```text
+ 大部分属性符合key-value形式，部分属性会兼容简写，如dispaly-flex / d-flex
+ 部分属性为常用组合属性，如正方形 square-80(width:80px;height:80px) flex-center-center等
```

### 详情如下

  * 宽或高 
    #### (w|h)-(数值)(单位)?
    ```css
    .w-10p{width:10%}
    .w-375{width:375px}
    ```
    ```javascript
    new RegExp(`^[wh]-(0|[1-9]\\d*)(${UNIT_ENUM_STR})?$`)
    ```
  * 最大(小)宽(高)
    #### (min|max)-(h|w)-(数值)(单位)?
    ```css
    .max-w-100 {max-width:100px;}
    .min-w-300rem {min-width:300rem;}
    .max-h-100vh {max-height:100vh}
    ```
    ```javascript
    new RegExp(`^(min|max)-[wh]-(0|[1-9]\\d*)(${UNIT_ENUM_STR})?$`)
    ```
  * 正方形简写
    #### square-(数值)(单位)?
    ```css
    .w-10p{width:10%} 
    .w-375{width:375px}
    .square-80{width:80px;height:80px}
    ```
    ```javascript
    new RegExp(`^square-(0|[1-9]\\d*)(${UNIT_ENUM_STR})?$`)
    ```
  * 内外间距
    #### (m|p)-(方向-)?(m-)?(数值)(单位)?
    ```css
    .m-16 {margin:16px}
    .m-b-32rem{margin-bottom:32rem}
    .m-x-m-22rem {margin-left:-22rem;margin-right:-22rem;}
    .p-x-24{padding-left:24px;padding-right:24px}
    ```
    ```javascript
    new RegExp(`^[mp]-(([trblxy])-)?(m-)?(0|[1-9]\\d*)(${UNIT_ENUM_STR})?$`)
    ```
  * 图层高度
    #### z-index-(m-)?(数值)
    ```css
    .z-index-9{z-index:9}
    .z-index-m-9{z-index:-9}
    ```
    ```javascript
    /^z-index-(m-)?(0|[1-9]\d*)$/
    ```
  * flex 系数
    #### flex-(数值|参数)
    ```css
    .flex-1{flex:1}
    .flex-none{flex:none}
    .flex-auto{flex:auto}
    ```
    ```javascript
    /^flex-(null|auto|(0|[1-9]\d*))$/
    ```
  * flex组合属性
    #### flex-(主轴参数)-(交叉轴参数)
    ```css
    .flex-space-between-center {
      display:flex;
      justify-content:space-between;
      align-items:center;
    }
    .flex-center-center {
      display:flex;
      justify-content:center;
      align-items:center;
    }
    ```
    ```javascript
    new RegExp(`^flex-(${JUSTIFY_CONTENT_ENUM_STR})-(${ALIGN_ITEMS_ENUM_STR})$`)
    ```
  * flex 换行
    #### flex-wrap-(参数)
    ```css
    .flex-wrap-inherit{flex-wrap:inherit;}

    .flex-wrap-initial{flex-wrap:initial;}

    .flex-wrap-nowrap{flex-wrap:nowrap;}

    .flex-wrap-wrap-reverse{flex-wrap:wrap-reverse;}

    .flex-wrap-wrap{flex-wrap:wrap;}
    ```
    ```javascript
    /^flex-wrap-(inherit|initial|nowrap|wrap|wrap-reverse)$/
    ```
  * flex主轴
    #### justify-content-(主轴参数)
    ```css
    .justify-content-space-between {justify-content:space-between;}
    ```
    ```javascript
    new RegExp(`^justify-content-(${JUSTIFY_CONTENT_ENUM_STR})$`)
    ```
  * flex交叉轴
    #### align-items-(交叉轴参数)
    ```css
    .align-items-center {align-items:center}
    ```
    ```javascript
     new RegExp(`^align-items-(${ALIGN_ITEMS_ENUM_STR})$`)
    ```
  * flex轴方向
    #### (flex-direction|flex)-(轴方向参数)
    ```css
    .flex-direction-column{ flex-direction:column; }
    .flex-column{ flex-direction:column; }
    ```
    ```javascript
    /^(flex-direction|flex)-(row|row-reverse|column|column-reverse)$/
    ```
  * 文字水平对齐
    #### (text-align|text)-(参数)
    ```css
    .text-align-center {text-align:center}
    .text-center {text-align:center}
    ```
    ```javascript
    /^(text-align|text)-(start|end|left|right|center|justify|match-parent)$/
    ```
  * 行高
    #### (lh|line-height)-(((数值)(单位)?)|参数)
    ```css
    .lh-14{line-height:14px;}
    .lh-normal{line-height:normal;}
    .line-height-14rem{line-height:14rem;}
    ```
    ```javascript
    new RegExp(`^(lh|line-height)-(((0|[1-9]\\d*)(${UNIT_ENUM_STR})?)|normal|unset|inherit|initial)$`)
    ```
  * 定位
    #### position-(定位参数)
    ```css
    .position-relative{position:relative}
    ```
    ```javascript
    /^position-(static|relative|sticky|unset|absolute|fixed|inherit|initial)$/
    ```
  * 方向定位
    #### (方向[trbl]top|right|bottom|left)-(m-)?-(数值)(单位)?
    ```css
    .l-283{left:283px;}
    .top-0px{top:0;}
    .right-m-672{right:-672px;}
    ```
    ```javascript
    new RegExp(`^[trbl]-(m-)?(0|[1-9]\\d*)(${UNIT_ENUM_STR})?$`)
    ```
  * 字体大小
    #### (font-size|fs)-(数值)(单位)?
    ```css
    .fs-22{font-size:22px}
    .font-size-22rem{font-size:22rem}
    ```
    ```javascript
    new RegExp(`^(font-size|fs)-(0|[1-9]\\d*)(${UNIT_ENUM_STR})?$`)
    ```
  * 字体粗细
    #### (font-weight|fw)-(参数)
    ```css
    .fw-bolder{font-weight:bolder}
    .font-weight-300{font-weight:300}
    .fw-900{font-weight:900}
    ```
    ```javascript
    new RegExp(`^(font-size|fs)-(0|[1-9]\\d*)(${UNIT_ENUM_STR})?$`)
    ```
  * 鼠标样式
    #### cursor-(参数)
    ```css
    .cursor-pointer{cursor:pointer;}
    ```
    ```javascript
    new RegExp(`^cursor-(${CURSOR_ENUM_STR})$`)
    ```
  * 文字折叠
    #### word-break-(参数)
    ```css
    .word-break-break-all{word-break:break-all}
    ```
    ```javascript
    /^word-break-(normal|break-all|keep-all|break-word|inherit|initial|unset)$/
    ```
  * display
    #### (display|d)-(参数)
    ```css
    .display-none{display:none}
    .d-flex{display:flex}
    ```
    ```javascript
    /^(display|d)-(none|inline|block|inline-block|flex|contents)$/
    ```
  * overflow
    #### overflow-(xy)?-(参数)
    ```css
    .overflow-x-hidden{overflow-x:hidden;}
    .overflow-auto{overflow:auto;}
    ```
    ```javascript
    /^overflow(-[xy])?-(hidden|auto|visible|scroll|inherit)$/
    ```
  * 颜色相关
    #### 自带 white transparent blue black 可进行配置
    ```javascript
    new RegExp(
    `^(?<type>color|c|text|bg|background|border-color|border-c)-(?<color>(#?([a-fA-F0-9]{8}$|[a-fA-F0-9]{6}|[a-fA-F0-9]{3}))|${getColorsKey().join('|')})(-(?<opacity>1|([1-9]\\d?)))?$`)
    ```
      * 字体颜色 
        ##### (color|c|text)-?(16进制色[8位,6位,3位]|自定义颜色)(-透明度 8位没有透明度)?
        ```css
        .c-red{color:rgba(255,0,0,1)}
        .color-43ad7f-25{color:rgba(67,173,127,0.25)}
        ```
      * 背景色 
        ##### (bg|background)-(伪类-)?(16进制色[6位或3位]|自定义颜色)(-透明度)?
        ```css
        .bg-black-35{background:rgba(0,0,0,0.35)}
        .background-active-43ad7f-35:active{background:rgba(67,173,127,0.35)}
        ```
      * 边框色 
        ##### (border-color|border-c)-(伪类-)?(16进制色[6位或3位]|自定义颜色)(-透明度)?
        ```css
        .border-c-black-35{border-color:rgba(0,0,0,0.35)}
        .border-color-active-43ad7f-35:active{border-color:rgba(67,173,127,0.35)}
        ```
      + 透明度
       ###  /^opacity-(0-100)$/
      ```css
        opacity-20{ opacity: 0.2 }
      ```
  * 字间距
    #### letter-spacing-(数值)(单位)?
    ```css
    .letter-spacing-4{letter-spacing:4px}
    .letter-spacing-4rem{letter-spacing:4rem}
    ```
    ```javascript
    new RegExp(`^letter-spacing-(m-)?(0|[1-9]\\d*)(${UNIT_ENUM_STR})?$`)
    ```
  * 组合属性 circle
    #### circle  只有一个
    ```css
    .circle{border-radius:50%;}
    ```
    ```javascript
    /^circle$/
    ```
  * flex缩放
    #### flex-(shrink|grow)-(数值|参数)
    ```css
    .flex-grow-1{flex-grow:1}
    .flex-shrink-0{flex-shrink:0}
    .flex-shrink-initial{flex-shrink:initial}
    ```
    ```javascript
    /^flex-(shrink|grow)-((0|[1-9]\d*)|initial|inherit)$/
    ```
  * flex占用轴空间
    #### flex-basis-((数值(单位)?)|其他参数)
    ```css
    .flex-basis-20p{flex-basis:20%}
    .flex-basis-20{flex-basis:20px;}
    .flex-basis-auto{flex-basis:auto;}
    ```
    ```javascript
    new RegExp(`^flex-basis-((0|[1-9]\\d*)(${UNIT_ENUM_STR})?|initial|inherit|auto)$`)
    ```
  * 边框宽度 自带实线 黑色
    #### (border|border-width|border-w)-(方向-)?(数值)(单位)?
    ```css
    .border-2{
      border-width: 2px; 
      border-style: solid; 
      border-color: black;
    }
    .border-w-x-2em{
      border-width: 2em; 
      border-style: solid; 
      border-color: black;
    }
    ```
    ```javascript
    new new RegExp(`^(border|border-width|border-w)-([trblxy]-)?(0|[1-9]\\d*)(${UNIT_ENUM_STR})?$`)
    ```
  * 边框圆角
    #### (border-radius|br)-(数值)(单位)?
    ```css
    .border-radius-4{border-radius:4px}
    .br-20p{border-radius:20%}
    ```
    ```javascript
    new RegExp(`^(border-radius|br)-(0|[1-9]\\d*)(${UNIT_ENUM_STR})?$`)
    ```
  * 边框类型
    #### border-style-(参数)
    ```css
    .border-style-dashed{border-style:dashed}
    ```
    ```javascript
    /^border-style-(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|inherit)$/
    ```
  * 图片填充
  #### object-fit-(参数)
  ```css
  .object-fit-fill{object-fit:fill}
  ```
  ```javascript
  /^object-fit-(fill|contain|cover|none|scale-down|inherit|initial|revert|unset)$/
  ```
  * text-align-last
    #### text-align-(参数)
    ```css
    .text-align-last-right{text-align-last:right;}
    ```
    ```javascript
    /^(text-align-last|text-last)-(auto|left|right|center|justify|start|end|initial|inherit)$/
    ```
  * 文本修饰
    #### (text-decoration|text)-(参数)
    ```css
    .text-decoration-underline{text-decoration:underline}
    .text-overline{text-decoration:overline}
    ```
    ```javascript
    /^(text-decoration|text)-(none|underline|overline|line-through|blink|inherit)$/
    ```
  * 鼠标选择
    #### (user-)?select-(参数)
    ```css
    .user-select-none{user-select:none}
    .select-none{user-select:none}
    .select-auto{user-select:auto}
    ```
    ```javascript
    /^(user-)?select-(none|auto|text|all|contain|element)$/
    ```
  * 文字超出换行
    #### (text-ellipsis|ellipsis)(-num)?
    ```css
    .ellipsis {
      display:inline-block;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap
      }
    .ellipsis-2 {
      overflow:hidden;
      text-overflow:ellipsis;
      display:-webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient:vertical;
    }
    .text-ellipsis-2 {
      overflow:hidden;
      text-overflow:ellipsis;
      display:-webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient:vertical;
    }
    ```
    ```javascript
    regExp: /^(text-)?ellipsis-[1-9]\d*$/
    ```
  * 间距

    #### gap-((数值(单位)?)|其他参数)
    ```css
    .gap-20 {
      column-gap:20px;
      row-gap:20px;
    }
    .gap-20p {
      column-gap:20%;
      row-gap:20%;
    }
    .gap-unset {
      column-gap:unset;
      row-gap:unset;
    }
    ```
    ```javascript
    regExp: /^gap-((<数字><单位>?)|inherit|initial|unset)*$/
    ```
  * 列间距

    #### column-gap-((数值(单位)?)|其他参数)
    ```css
    .column-gap-20 {
      column-gap:20px;
    }
    .column-gap-20p {
      column-gap:20%;
    }
    .column-gap-unset {
      column-gap:unset;
    }
    ```
    ```javascript
    regExp: /^column-gap-((<数字><单位>?)|inherit|initial|unset)*$/
    ```
  * 行间距

    #### row-gap-((数值(单位)?)|其他参数)
    ```css
    .row-gap-20 {
      row-gap:20px;
    }
    .row-gap-20p {
      row-gap:20%;
    }
    .row-gap-unset {
      row-gap:unset;
    }
    ```
    ```javascript
    regExp: /^row-gap-((<数字><单位>?)|inherit|initial|unset)*$/
    ```
    #### visibility-(值)
    ```css
    .visibility-hidden {
      visibility: hidden;
    }
    .visibility-visible {
      visibility: visible;
    }
    ```
### 进阶使用
+ 关于 modifyRules 可覆盖属性如下
  + alignItems
  + border
  + borderRadius
  + borderStyle
  + boxSizing
  + circle
  + color
  + columnGap
  + cursor
  + display
  + flexBasis
  + flexDirection
  + flexJustAli
  + flexNum
  + flexShrinkAndGrow
  + flexWrap
  + fontSize
  + fontWeight
  + gap
  + height
  + index
  + justifyContent
  + letterSpacing
  + lineHeight
  + marginAndPadding
  + maxHeight
  + maxWidth
  + minHeight
  + minWidth
  + objectFit
  + opacity
  + orientation
  + overflow
  + position
  + rowGap
  + square
  + textAlign
  + textAlignLast
  + textDecoration
  + textEllipsis
  + userSelect
  + verticalAlign
  + visibility
  + width
  + wordBreak
  + zIndex

  ### 说明如下
  ```javascript
  modifyRules: {
        /**
         * 如需覆盖自带属性 则属性名 相同
         * 此处值 为 object 或者 函数 函数必须返回相同格式的对象
         * 函数可接受 自带工具 工具有
         * textToRgbText 将16进制颜色 或定义的颜色转为rgba语法
         * getColorsKey 获取所有定义的颜色的key数组
         * getColors 获取所有定义的颜色的对象
         * UNIT_ENUM_STR 捕获单位的正则字符串
         * NONNEGATIVE_NUMBER_REGEX_STR 捕获数字的正则字符串
         * DIRECTION_MAP 方向定义的 map
         */
       zIndex: ({ textToRgbText, getColorsKey, getColors, UNIT_ENUM_STR, NONNEGATIVE_NUMBER_REGEX_STR, DIRECTION_MAP }) => { 
         return {
           /**
            * 此处必须存在 regExp 为正则表达式 或 函数 函数必须返回正则表达式
            * 此处必须存在 render 函数 
            * 入参 为 字符串mathch 正则表达式的结果 (只有匹配上的才会调用render)
            * render 函数必须返回 name:String order:Number css:Array<String>
            * 将会使用 render 返回的结果 生成css
            * 如果导出 num 则会按照num 组内渲染排序 与其他css 排序无关
            * 如果捕获组有 unit 会自动处理单位问题
            */
           regExp: /^zindex-(?<isMinus>m-)?(?<num>0|[1-9]\d*)$/,
           render ({ groups }) {
             let { isMinus, num } = groups
             if (isMinus) {
               num = 0 - num
             }
             return { name: 'zIndex', order: 190, num, css: [`z-index: ${num}] }
           }
         }
       }

    },
    mediaQueries: {
      // 前面为前缀 后面为媒体属性 
      // 属性相同则覆盖自带属性
      sm: '(min-width: 640px)',
      md: '(min-width: 768px)',
      lg: '(min-width: 1024px)',
      xl: '(min-width: 1280px)'
    }

  ```