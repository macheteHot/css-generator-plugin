import { JUSTIFY_CONTENT_ENMU, ALIGN_ITEMS_ENMU, CURSOR_ENMU } from '../src/constant'
const fs = require('fs')
const path = require('path')
const NUM_ENMU = [1, 2]
const UNIT_ENMU = ['', 'p', 'rem', 'vh']
const NUM_WIDTH_UNIT = [1, 2, '1p', '1rem', '1vh']

function getRegList () {
  return [{
    className: 'widthOrHeight',
    // regExp: new RegExp(`^[wh]-(0|1|1(${UNIT_ENMU_STR})?)$`),
    render () {
      let widthOrHeight = '';
      ['w', 'h'].forEach(d => {
        NUM_ENMU.forEach(n => {
          UNIT_ENMU.forEach(u => {
            widthOrHeight += `.${d}-${n}${u}{}`
          })
        })
      })
      return widthOrHeight
    }
  },
  {
    className: 'square',
    // regExp: new RegExp(`^square-(0|1|1(${UNIT_ENMU_STR})?)$`)
    render () {
      let square = ''
      NUM_ENMU.forEach(n => {
        UNIT_ENMU.forEach(u => {
          square += `.square-${n}${u}{}`
        })
      })
      return square
    }
  },
  {
    className: 'minMaxWidthOrHeight',
    // regExp: new RegExp(`^(min|max)-[wh]-(0|1|1(${UNIT_ENMU_STR})?)$`),
    render () {
      let minMaxWidthOrHeight = '';
      ['min', 'max'].forEach(mm => {
        ['w', 'h'].forEach(wh => {
          NUM_ENMU.forEach(n => {
            UNIT_ENMU.forEach(u => {
              minMaxWidthOrHeight += `.${mm}-${wh}-${n}${u}{}`
            })
          })
        })
      })
      return minMaxWidthOrHeight
    }
  },
  {
    className: 'marginOrPadding',
    // regExp: new RegExp(`^[mp]-(([trblxy])-)?(m-)?(0|1|1(${UNIT_ENMU_STR})?)$`),
    render () {
      let marginOrPadding = '';
      ['m', 'p'].forEach(mp => {
        ['t-', 'r-', 'b-', 'l-', 'x-', 'y-', ''].forEach(trblxy => {
          ['m-', ''].forEach(m => {
            NUM_ENMU.forEach(n => {
              UNIT_ENMU.forEach(u => {
                marginOrPadding += `.${mp}-${trblxy}${m}${n}${u}{}`
              })
            })
          })
        })
      })
      return marginOrPadding
    }
  },
  {
    className: 'marginOrPaddingUseAuto',
    render () {
      let marginOrPadding = '';
      ['m', 'p'].forEach(mp => {
        ['t-', 'r-', 'b-', 'l-', 'x-', 'y-', ''].forEach(trblxy => {
          marginOrPadding += `.${mp}-${trblxy}auto{}`
        })
      })
      return marginOrPadding
    }
  },
  {
    className: 'zIndex',
    // regExp: /^z-index-(m-)?(0|1)$/,
    render () {
      let zIndex = '';
      ['m-', ''].forEach(m => {
        NUM_ENMU.forEach(n => {
          zIndex += `.z-index-${m}${n}{}`
        })
      })
      return zIndex
    }

  },
  {
    // flex-1 flex-9999
    className: 'flexNum',
    // regExp: /^flex-(null|auto|(0|1))$/,
    render () {
      let flexNum = '';
      ['null', 'auto', '0', '1'].forEach(x => {
        flexNum += `.flex-${x}{}`
      })
      return flexNum
    }
  },
  {
    className: 'text-align',
    // regExp: /^(text-align|text)-(start|end|left|right|center|justify|match-parent)$/,
    render () {
      let textAlign = '';
      ['text-align', 'text'].forEach(t => {
        ['start', 'end', 'left', 'right', 'center', 'justify', 'match-parent'].forEach(v => {
          textAlign += `.${t}-${v}{}`
        })
      })
      return textAlign
    }
  },
  { //
    className: 'line-height',
    // regExp: new RegExp(`^(lh|line-height)-(((0|1|1(${UNIT_ENMU_STR})?))|normal|unset|inherit|initial)$`)
    render () {
      let str = '';
      ['lh', 'line-height'].forEach(lh => {
        [...NUM_WIDTH_UNIT, 'normal', 'unset', 'inherit', 'initial'].forEach(v => {
          str += `.${lh}-${v}{}`
        })
      })
      return str
    }
  },
  {
    // flex-just-ali
    className: 'flex',
    // regExp: new RegExp(`^flex-(${JUSTIFY_CONTENT_ENMU_STR})-(${ALIGN_ITEMS_ENMU_STR})$`),
    render () {
      let str = ''
      JUSTIFY_CONTENT_ENMU.forEach(jc => {
        ALIGN_ITEMS_ENMU.forEach(ai => {
          str += `.flex-${jc}-${ai}{}`
        })
      })
      return str
    }

  },
  {
    className: 'justify-content',
    // regExp: new RegExp(`^justify-content-(${JUSTIFY_CONTENT_ENMU_STR})$`),
    render () {
      let str = ''
      JUSTIFY_CONTENT_ENMU.forEach(jc => {
        str += `.justify-content-${jc}{}`
      })
      return str
    }
  },
  {
    className: 'align-items',
    // regExp: new RegExp(`^align-items-(${ALIGN_ITEMS_ENMU_STR})$`),
    render () {
      let str = ''
      ALIGN_ITEMS_ENMU.forEach(ai => {
        str += `.justify-content-${ai}{}`
      })
      return str
    }
  },
  {
    className: 'flex-direction',
    // regExp: /^(flex-direction|flex)-(row|row-reverse|column|column-reverse)$/,
    render () {
      let str = '';
      ['flex-direction', 'flex'].forEach(t => {
        ['row', 'row-reverse', 'column', 'column-reverse'].forEach(v => {
          str += `.${t}-${v}{}`
        })
      })
      return str
    }
  },
  {
    className: 'flex-wrap-value',
    render () {
      let str = '';
      ['inherit', 'initial', 'nowrap', 'wrap', 'wrap-reverse'].forEach(v => {
        str += `.flex-wrap-${v}{}`
      })
      return str
    }
  },
  {
    // 定位方式枚举
    className: 'position',
    // regExp: /^position-(static|relative|sticky|unset|absolute|fixed|inherit|initial)$/,
    render () {
      let str = '';
      ['static', 'relative', 'sticky', 'unset', 'absolute', 'fixed', 'inherit', 'initial'].forEach(v => {
        str += `.position-${v}{}`
      })
      return str
    }
  },
  {
    // 绝对定位 方向 t-20vh top:20vh -m负数
    className: 'orientation',
    // regExp: new RegExp(`^([trbl]|top|right|bottom|left)-(m-)?(0|1|1(${UNIT_ENMU_STR})?)$`),
    render () {
      let str = '';
      ['t', 'r', 'b', 'l', 'top', 'right', 'bottom', 'left'].forEach(trbl => {
        ['m-', ''].forEach(m => {
          NUM_WIDTH_UNIT.forEach(v => {
            str += `.${trbl}-${m}${v}{}`
          })
        })
      })
      return str
    }
  },
  {
    // 鼠标样式方式枚举
    className: 'cursor',
    // regExp: new RegExp(`^cursor-(${CURSOR_ENMU_STR})$`),
    render () {
      let str = ''
      CURSOR_ENMU.forEach(v => {
        str += `.cursor-${v}{}`
      })
      return str
    }
  },
  {
    // 文字折叠
    className: 'word-break',
    // regExp: /^word-break-(normal|break-all|keep-all|break-word|inherit|initial|unset)$/,
    render () {
      let str = '';
      ['normal', 'break-all', 'keep-all', 'break-word', 'inherit', 'initial', 'unset'].forEach(v => {
        str += `.word-break-${v}{}`
      })
      return str
    }
  },
  {
    // 字体粗细
    className: 'font-weight',
    // regExp: /^(font-weight|fw)-([1-9]00|normal|bold|bolder|inherit|initial|lighter|normal|unset)$/,
    render () {
      let str = '';
      ['font-weight', 'fw'].forEach(fw => {
        [100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold', 'bolder', 'inherit', 'initial', 'lighter', 'normal', 'unset'].forEach(v => {
          str += `.${fw}-${v}{}`
        })
      })
      return str
    }
  },
  {
    // 字体粗细
    className: 'font-size',
    // regExp: new RegExp(`^(font-size|fs)-(0|1|1(${UNIT_ENMU_STR})?)$`),
    render () {
      let str = '';
      ['font-size', 'fs'].forEach(fs => {
        NUM_ENMU.forEach(n => {
          UNIT_ENMU.forEach(u => {
            str += `.${fs}-${n}${u}{}`
          })
        })
      })
      return str
    }
  },
  // display
  {
    className: 'display',
    // regExp: /^(display|d)-(none|inline|block|inline-block|flex)$/,
    render () {
      let str = '';
      ['display', 'd'].forEach(d => {
        ['none', 'inline', 'block', 'inline-block', 'flex'].forEach(v => {
          str += `.${d}-${v}{}`
        })
      })
      return str
    }
  },
  // overflow
  {
    className: 'overflow',
    // regExp: /^overflow(-[xy])?-(hidden|auto|visible|scroll|inherit)$/,
    render () {
      let str = '';
      ['x-', 'y-', ''].forEach(xy => {
        ['hidden', 'auto', 'visible', 'scroll', 'inherit'].forEach(v => {
          str += `.overflow-${xy}${v}{}`
        })
      })
      return str
    }
  },
  {
    className: 'letter-spacing',
    // regExp: new RegExp(`^letter-spacing-(m-)?(0|1|1(${UNIT_ENMU_STR})?)$`)
    render () {
      let str = '';
      ['m-', ''].forEach(m => {
        NUM_WIDTH_UNIT.forEach(v => {
          str += `.letter-spacing-${m}${v}{}`
        })
      })
      return str
    }
  },
  {
    className: 'circle',
    // regExp: /^circle$/,
    render () {
      return '.circle'
    }
  },
  {
    className: 'flexShrinkAndGrow',
    // regExp: /^flex-(shrink|grow)-((0|1)|initial|inherit)$/
    render () {
      let str = '';
      ['shrink', 'grow'].forEach(sg => {
        [...NUM_ENMU, 'initial', 'inherit'].forEach(v => {
          str += `.flex-${sg}-${v}{}`
        })
      })
      return str
    }
  },
  {
    className: 'flex-basis',
    // regExp: new RegExp(`^flex-basis-((0|1|1(${UNIT_ENMU_STR})?)|initial|inherit|auto)$`),
    render () {
      let str = '';
      [...NUM_WIDTH_UNIT, 'initial', 'inherit', 'auto'].forEach(v => {
        str += `.flex-basis-${v}{}`
      })
      return str
    }
  },
  {
    className: 'border',
    // 这个宽度没有百分比
    // regExp: new RegExp(`^(border|border-width|border-w)-([trblxy]-)?(0|1|1(${UNIT_ENMU_STR})?)$`),
    render () {
      let str = '';
      ['border', 'border-width', 'border-w'].forEach(bw => {
        ['t-', 'r-', 'b-', 'l-', 'x-', 'y-', ''].forEach(trblxy => {
          NUM_WIDTH_UNIT.forEach(v => {
            str += `.${bw}-${trblxy}${v}{}`
          })
        })
      })
      return str
    }
  },
  {
    className: 'border-radius',
    // regExp: new RegExp(`^(border-radius|br)-(0|1|1(${UNIT_ENMU_STR})?)$`),
    render () {
      let str = '';
      ['border-radius', 'br'].forEach(br => {
        NUM_WIDTH_UNIT.forEach(v => {
          str += `.${br}-${v}{}`
        })
      })
      return str
    }
  },
  {
    className: 'border-style',
    // regExp: /^border-style-(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|inherit)$/,
    render () {
      let str = '';
      ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'inherit'].forEach(v => {
        str += `.border-style-${v}{}`
      })
      return str
    }
  },
  {
    className: 'text-align-last',
    regExp: /^(text-align-last|text-last)-(auto|left|right|center|justify|start|end|initial|inherit)$/,
    render () {
      let str = '';
      ['text-align-last', 'text-last'].forEach(tl => {
        ['auto', 'left', 'right', 'center', 'justify', 'start', 'end', 'initial', 'inherit'].forEach(v => {
          str += `.${tl}-${v}{}`
        })
      })
      return str
    }
  },
  {
    className: 'text-decoration',
    regExp: /^(text-decoration|text)-(none|underline|overline|line-through|blink|inherit)$/,
    render () {
      let str = '';
      ['text-decoration', 'text'].forEach(text => {
        ['none', 'underline', 'overline', 'line-through', 'blink', 'inherit'].forEach(v => {
          str += `.${text}-${v}{}`
        })
      })
      return str
    }
  },
  {
    className: 'user-select',
    regExp: /^user-select-(none|auto|text|all|contain|element)$/,
    render () {
      let str = '';
      ['user-select', 'select'].forEach(s => {
        ['none', 'auto', 'text', 'all', 'contain', 'element'].forEach(v => {
          str += `.${s}-${v}{}`
        })
      })
      return str
    }
  },
  {
    className: 'text-ellipsis-num',
    // regExp: /^(text-)?ellipsis(-(0|1))?$/,
    render () {
      let str = '';
      ['ellipsis', 'text', 'text-ellipsis'].forEach(t => {
        ['', ...NUM_ENMU].forEach(n => {
          str += `.${t}-${n}{}`
        })
      })
      return str
    }
  },
  {
    // 所有有关颜色的
    className: 'color',
    // regExp: new RegExp(
    //     `^(color|c|text|bg|background|border-color|border-c)-((hover|link|visited|active|focus|focus-within)-)?(fafafa|${getColorsKey().join('|')})(-(25|100))?$`
    // ),
    render () {
      let str = '';
      ['color', 'c', 'text', 'bg', 'background', 'border-color', 'border-c'].forEach(t => {
        ['', 'hover-', 'link-', 'visited-', 'active-', 'focus-', 'focus-within-'].forEach(hover => {
          ['ff0', 'fafafa', 'red', 'transparent'].forEach(c => {
            ['', '-65', '-85'].forEach(o => {
              str += `.${t}-${hover}${c}${o}{}`
            })
          })
        })
      })
      return str
    }
  }
  ]
}

function fwFile (str, flag) {
  fs.writeFileSync(path.resolve(process.cwd(), './auto-use-snippets.css'), str, {
    flag
  })
}
fwFile('', 'w')
const snippetStr = getRegList().reduce((t, c) => `${t}${c.render()}`, '')
fwFile(snippetStr, 'w')
