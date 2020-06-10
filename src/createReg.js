const { getColorsKey } = require('./colorUtils')
const {
  JUSTIFY_CONTENT_ENMU_STR,
  ALIGN_ITEMS_ENMU_STR,
  UNIT_ENMU_STR,
  CURSOR_ENMU_STR
} = require('./constant')

function getRegList () {
  return [
    {
      className: 'widthOrHeight',
      regExp: new RegExp(`^[wh]-(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
    },
    {
      className: 'square',
      regExp: new RegExp(`^square-(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
    },
    {
      className: 'minMaxWidthOrHeight',
      regExp: new RegExp(`^(min|max)-[wh]-(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
    },
    {
      className: 'marginOrPadding',
      regExp: new RegExp(`^[mp]-(([trblxy])-)?(m-)?(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
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
      regExp: new RegExp(`^(lh|line-height)-(((0|[1-9]\\d*)(${UNIT_ENMU_STR})?)|normal|unset|inherit|initial)$`)
    },
    {
    // flex-just-ali
      className: 'flex',
      regExp: new RegExp(`^flex-(${JUSTIFY_CONTENT_ENMU_STR})-(${ALIGN_ITEMS_ENMU_STR})$`)
    },
    {
      className: 'justify-content',
      regExp: new RegExp(`^justify-content-(${JUSTIFY_CONTENT_ENMU_STR})$`)
    },
    {
      className: 'align-items',
      regExp: new RegExp(`^align-items-(${ALIGN_ITEMS_ENMU_STR})$`)
    },
    {
      className: 'flex-direction',
      regExp: /^(flex-direction|flex)-(row|row-reverse|column|column-reverse)$/
    },
    {
    // 定位方式枚举
      className: 'position',
      regExp: /^position-(static|relative|sticky|unset|absolute|fixed|inherit|initial)$/
    },
    {
    // 绝对定位 方向 t-20vh top:20vh -m负数
      className: 'orientation',
      regExp: new RegExp(`^[trbl]-(m-)?(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
    },
    {
    // 鼠标样式方式枚举
      className: 'cursor',
      regExp: new RegExp(`^cursor-(${CURSOR_ENMU_STR})$`)
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
      regExp: new RegExp(`^(font-size|fs)-(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
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
        `^(color|c|text|bg|background|border-color|border-c)-((hover|link|visited|active|focus|focus-within)-)?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|${getColorsKey().join('|')})(-([1-9]\\d*|100))?$`
      )
    },
    {
      className: 'letter-spacing',
      regExp: new RegExp(`^letter-spacing-(m-)?(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
    },
    {
      className: 'circle',
      regExp: /^circle$/,
      static: '.circle{border-radius:50%;}'
    },
    {
      className: 'flexShrinkAndGrow',
      regExp: /^flex-(shrink|grow)-((0|[1-9]\d*)|initial|inherit)$/
    },
    {
      className: 'flex-basis',
      regExp: new RegExp(`^flex-basis-((0|[1-9]\\d*)(${UNIT_ENMU_STR})?|initial|inherit|auto)$`)
    },
    {
      className: 'border',
      // 这个宽度没有百分比
      regExp: new RegExp(`^(border|border-width|border-w)-([trblxy]-)?(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
    },
    {
      className: 'border-radius',
      regExp: new RegExp(`^(border-radius|br)-(0|[1-9]\\d*)(${UNIT_ENMU_STR})?$`)
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
      className: 'user-select',
      regExp: /^(user-)?select-(none|auto|text|all|contain|element)$/
    },
    {
      className: 'text-ellipsis-num',
      regExp: /^(text-)?ellipsis(-[1-9]\d*)?$/
    }
  ]
}

module.exports = {
  getRegList
}
