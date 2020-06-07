const { getColorsKey } = require('./colorUtils')

function getRegList () {
  return [
    {
      className: 'widthOrHeight',
      regExp: /^[wh]-(0|[1-9]\d*)(rem|em|vw|vh|p|px|rpx)?$/
    },
    {
      className: 'square',
      regExp: /^square-(0|[1-9]\d*)(rem|em|vw|vh|p|px|rpx)?$/
    },
    {
      className: 'minMaxWidthOrHeight',
      regExp: /^(min|max)-[wh]-(0|[1-9]\d*)(rem|em|vw|vh|p|px|rpx)?$/
    },
    {
      className: 'marginOrPadding',
      regExp: /^[mp]-(([trblxy])-)?(m-)?(0|[1-9]\d*)(rem|em|vw|vh|p|px|rpx)?$/
    },
    {
      className: 'zIndex',
      regExp: /^z-index-(m-)?(0|[1-9]\d*)$/
    },
    {
    // flex-1 flex-9999
      className: 'flexNum',
      regExp: /^flex-(null|auto|(0|[1-9]\d*))$/
    },
    {
      className: 'text-align',
      regExp: /^(text-align|text)-(start|end|left|right|center|justify|match-parent)$/
    },
    { //
      className: 'line-height',
      regExp: /^(lh|line-height)-(((0|[1-9]\d*)(rem|em|vw|vh|p|px|rpx)?)|normal|unset|inherit|initial)$/
    },
    {
    // flex-just-ali
      className: 'flex',
      regExp: /^flex-(auto|flex-start|flex-end|center|space-between|space-around)-(auto|flex-start|flex-end|center|stretch)$/
    },
    {
    // 定位方式枚举
      className: 'position',
      regExp: /^position-(static|relative|sticky|unset|absolute|fixed|inherit|initial)$/
    },
    {
    // 绝对定位 方向 t-20vh top:20vh -m负数
      className: 'orientation',
      regExp: /^[trbl]-(m-)?(0|[1-9]\d*)(rem|em|vw|vh|p|px|rpx)?$/
    },
    {
    // 鼠标样式方式枚举
      className: 'cursor',
      regExp: /^cursor-(auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing)$/
    },
    {
    // 文字折叠
      className: 'word-break',
      regExp: /^word-break-(normal|break-all|keep-all|break-word|inherit|initial|unset)$/
    },
    {
    // 字体粗细
      className: 'font-weight',
      regExp: /^(font-weight|fw)-([1-9]00|normal|bold|bolder|inherit|initial|lighter|normal|unset)$/
    },
    {
    // 字体粗细
      className: 'font-size',
      regExp: /^(font-size|fs)-(0|[1-9]\d*)(rem|em|vw|vh|p|px|rpx)?$/
    },
    // display
    {
      className: 'display',
      regExp: /^(display|d)-(none|inline|block|inline-block|flex)$/
    },
    // overflow
    {
      className: 'overflow',
      regExp: /^overflow(-[xy])?-(hidden|auto|visible|scroll|inherit)$/
    },
    {
    // 所有有关颜色的
      className: 'color',
      regExp: new RegExp(
        `^(color|c|text|bg|background|border-color|border-c)-((hover|link|visited|active|focus|focus-within)-)?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|${getColorsKey().join('|')})(-([1-9]\\d|100))?$`
      )
    },
    {
      className: 'letter-spacing',
      // 这个宽度没有百分比
      regExp: /^letter-spacing-(m-)?(0|[1-9]\d*)(rem|em|vw|vh|px|rpx)?$/
    },
    {
      className: 'circle',
      regExp: /^circle$/,
      static: '.circle{border-radius:50%}'
    },
    {
      className: 'flexShrinkAndGrow',
      regExp: /^flex-(shrink|grow)-((0|[1-9]\d*)|initial|inherit)$/
    },
    {
      className: 'flex-basis',
      regExp: /^flex-basis-((0|[1-9]\d*)(rem|em|vw|vh|p|px|rpx)?|initial|inherit|auto)$/
    },
    {
      className: 'border',
      // 这个宽度没有百分比
      regExp: /^(border|border-width|border-w)-([trblxy]-)?(0|[1-9]\d*)(rem|em|vw|vh|px|rpx)?$/
    },
    {
      className: 'border-radius',
      regExp: /^(border-radius|br)-(0|[1-9]\d*)(rem|em|vw|vh|px|rpx|p)?$/
    },
    {
      className: 'border-style',
      regExp: /^border-style-(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|inherit)$/
    },
    {
      className: 'text-align-last',
      regExp: /^(text-align-last|text-last)-(auto|left|right|center|justify|start|end|initial|inherit)$/
    },
    {
      className: 'text-decoration',
      regExp: /^(text-decoration|text)-(none|underline|overline|line-through|blink|inherit)$/
    },
    {
      className: 'text-ellipsis',
      regExp: /^text-ellipsis$/,
      static: '.text-ellipsis{display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'
    },
    {
      className: 'user-select',
      regExp: /^user-select-(none|auto|text|all|contain|element)$/
    },
    { // 单独提出来 很常用
      className: 'select-none',
      regExp: /^select-none$/,
      static: '.select-none{user-select:none}'
    }
  ]
}

module.exports = {
  getRegList
}
