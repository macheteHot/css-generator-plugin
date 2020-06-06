const { getColorsKey } = require('./colorUtils')

function getRegList () {
  return [{
    className: 'widthOrHeight',
    regExp: /^(w|h)-(\d+)(rem|em|vw|vh|p|px|rpx)?$/
  },
  {
    className: 'marginOrPadding',
    regExp: /^(m|p)(-|-t-|-r-|-b-|-l-|-x-|-y-)(m-)?\d+(rem|em|vw|vh|p|px|rpx)?$/
  },
  {
    // flex-1 flex-9999
    className: 'flexNum',
    regExp: /^flex-(null|auto|\d+)$/
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
    regExp: /^[trbl]-(m-)?\d+(rem|em|vw|vh|p|px|rpx)?$/
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
    regExp: /^(font-size|fs)-\d+(rem|em|vw|vh|p|px|rpx)?$/
  },
  {
    className: 'display',
    regExp: /^(display|d)-(none|inline|block|inline-block|flex)$/
  },
  {
    // 所有有关颜色的
    className: 'color',
    regExp: new RegExp(
        `^(color|c|text|bg|background|border-color)-((hover|link|visited|active|focus|focus-within)-)?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|${getColorsKey().join('|')})(-([1-9]\\d|100))?$`
    )
  },
  {
    className: 'letter-spacing',
    regExp: /^letter-spacing-(m-)?\d+(rem|em|vw|vh|p|px|rpx)?$/
  }
  ]
}

module.exports = {
  getRegList
}
