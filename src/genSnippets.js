import { JUSTIFY_CONTENT_ENMU, ALIGN_ITEMS_ENMU, CURSOR_ENMU } from '../src/constant'
const fs = require('fs')
const path = require('path')
const NUM_ENMU = [1, 2]
const UNIT_ENMU = ['', 'p', 'rem', 'vh']
const NUM_WIDTH_UNIT = [1, 2, '1p', '1rem', '1vh']
const PSEUDO_LIST = ['', 'hover\\:', 'active\\:']
const MEIDA_QUERYS = ['', 'xl\\@', 'lg\\@', 'md\\@', 'sm\\@']

function getRegList () {
  return [{
    className: 'widthOrHeight',
    // regExp: new RegExp(`^[wh]-(0|1|1(${UNIT_ENMU_STR})?)$`),
    render () {
      let widthOrHeight = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['w', 'h'].forEach(d => {
            NUM_ENMU.forEach(n => {
              UNIT_ENMU.forEach(u => {
                widthOrHeight += `.${md}${pseudo}${d}-${n}${u}{}`
              })
            })
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
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          NUM_ENMU.forEach(n => {
            UNIT_ENMU.forEach(u => {
              square += `.${md}${pseudo}square-${n}${u}{}`
            })
          })
        })
      })
      return square
    }
  },
  {
    className: 'minMaxWidthOrHeight',
    // regExp: new RegExp(`^(min|max)-[wh]-(0|1|1(${UNIT_ENMU_STR})?)$`),
    render () {
      let minMaxWidthOrHeight = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['min', 'max'].forEach(mm => {
            ['w', 'h'].forEach(wh => {
              NUM_ENMU.forEach(n => {
                UNIT_ENMU.forEach(u => {
                  minMaxWidthOrHeight += `.${md}${pseudo}${mm}-${wh}-${n}${u}{}`
                })
              })
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
      let marginOrPadding = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['m', 'p'].forEach(mp => {
            ['t-', 'r-', 'b-', 'l-', 'x-', 'y-', ''].forEach(trblxy => {
              ['m-', ''].forEach(m => {
                NUM_ENMU.forEach(n => {
                  UNIT_ENMU.forEach(u => {
                    marginOrPadding += `.${md}${pseudo}${mp}-${trblxy}${m}${n}${u}{}`
                  })
                })
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
      let marginOrPadding = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['m', 'p'].forEach(mp => {
            ['t-', 'r-', 'b-', 'l-', 'x-', 'y-', ''].forEach(trblxy => {
              marginOrPadding += `.${md}${pseudo}${mp}-${trblxy}auto{}`
            })
          })
        })
      })
      return marginOrPadding
    }
  },
  {
    className: 'zIndex',
    // regExp: /^z-index-(m-)?(0|1)$/,
    render () {
      let zIndex = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['m-', ''].forEach(m => {
            NUM_ENMU.forEach(n => {
              zIndex += `.${md}${pseudo}z-index-${m}${n}{}`
            })
          })
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
      let flexNum = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['null', 'auto', '0', '1'].forEach(x => {
            flexNum += `.${md}${pseudo}flex-${x}{}`
          })
        })
      })
      return flexNum
    }
  },
  {
    className: 'text-align',
    // regExp: /^(text-align|text)-(start|end|left|right|center|justify|match-parent)$/,
    render () {
      let textAlign = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['text-align', 'text'].forEach(t => {
            ['start', 'end', 'left', 'right', 'center', 'justify', 'match-parent'].forEach(v => {
              textAlign += `.${md}${pseudo}${t}-${v}{}`
            })
          })
        })
      })

      return textAlign
    }
  },
  { //
    className: 'line-height',
    // regExp: new RegExp(`^(lh|line-height)-(((0|1|1(${UNIT_ENMU_STR})?))|normal|unset|inherit|initial)$`)
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['lh', 'line-height'].forEach(lh => {
            [...NUM_WIDTH_UNIT, 'normal', 'unset', 'inherit', 'initial'].forEach(v => {
              str += `.${md}${pseudo}${lh}-${v}{}`
            })
          })
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
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          JUSTIFY_CONTENT_ENMU.forEach(jc => {
            ALIGN_ITEMS_ENMU.forEach(ai => {
              str += `${md}${pseudo}.flex-${jc}-${ai}{}`
            })
          })
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
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          JUSTIFY_CONTENT_ENMU.forEach(jc => {
            str += `${md}${pseudo}.justify-content-${jc}{}`
          })
        })
      })
      return str
    }
  },
  {
    className: 'align-items',
    // regExp: new RegExp(`^align-items-(${ALIGN_ITEMS_ENMU_STR})$`),
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ALIGN_ITEMS_ENMU.forEach(ai => {
            str += `${md}${pseudo}.justify-content-${ai}{}`
          })
        })
      })
      return str
    }
  },
  {
    className: 'flex-direction',
    // regExp: /^(flex-direction|flex)-(row|row-reverse|column|column-reverse)$/,
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['flex-direction', 'flex'].forEach(t => {
            ['row', 'row-reverse', 'column', 'column-reverse'].forEach(v => {
              str += `${md}${pseudo}.${t}-${v}{}`
            })
          })
        })
      })
      return str
    }
  },
  {
    className: 'flex-wrap-value',
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['inherit', 'initial', 'nowrap', 'wrap', 'wrap-reverse'].forEach(v => {
            str += `${md}${pseudo}.flex-wrap-${v}{}`
          })
        })
      })
      return str
    }
  },
  {
    // 定位方式枚举
    className: 'position',
    // regExp: /^position-(static|relative|sticky|unset|absolute|fixed|inherit|initial)$/,
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['static', 'relative', 'sticky', 'unset', 'absolute', 'fixed', 'inherit', 'initial'].forEach(v => {
            str += `${md}${pseudo}.position-${v}{}`
          })
        })
      })
      return str
    }
  },
  {
    // 绝对定位 方向 t-20vh top:20vh -m负数
    className: 'orientation',
    // regExp: new RegExp(`^([trbl]|top|right|bottom|left)-(m-)?(0|1|1(${UNIT_ENMU_STR})?)$`),
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['t', 'r', 'b', 'l', 'top', 'right', 'bottom', 'left'].forEach(trbl => {
            ['m-', ''].forEach(m => {
              NUM_WIDTH_UNIT.forEach(v => {
                str += `${md}${pseudo}.${trbl}-${m}${v}{}`
              })
            })
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
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          CURSOR_ENMU.forEach(v => {
            str += `${md}${pseudo}.cursor-${v}{}`
          })
        })
      })
      return str
    }
  },
  {
    // 文字折叠
    className: 'word-break',
    // regExp: /^word-break-(normal|break-all|keep-all|break-word|inherit|initial|unset)$/,
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['normal', 'break-all', 'keep-all', 'break-word', 'inherit', 'initial', 'unset'].forEach(v => {
            str += `${md}${pseudo}.word-break-${v}{}`
          })
        })
      })
      return str
    }
  },
  {
    // 字体粗细
    className: 'font-weight',
    // regExp: /^(font-weight|fw)-([1-9]00|normal|bold|bolder|inherit|initial|lighter|normal|unset)$/,
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['font-weight', 'fw'].forEach(fw => {
            [100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold', 'bolder', 'inherit', 'initial', 'lighter', 'normal', 'unset'].forEach(v => {
              str += `${md}${pseudo}.${fw}-${v}{}`
            })
          })
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
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['font-size', 'fs'].forEach(fs => {
            NUM_ENMU.forEach(n => {
              UNIT_ENMU.forEach(u => {
                str += `${md}${pseudo}.${fs}-${n}${u}{}`
              })
            })
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
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['display', 'd'].forEach(d => {
            ['none', 'inline', 'block', 'inline-block', 'flex'].forEach(v => {
              str += `${md}${pseudo}.${d}-${v}{}`
            })
          })
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
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['x-', 'y-', ''].forEach(xy => {
            ['hidden', 'auto', 'visible', 'scroll', 'inherit'].forEach(v => {
              str += `${md}${pseudo}.overflow-${xy}${v}{}`
            })
          })
        })
      })
      return str
    }
  },
  {
    className: 'letter-spacing',
    // regExp: new RegExp(`^letter-spacing-(m-)?(0|1|1(${UNIT_ENMU_STR})?)$`)
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['m-', ''].forEach(m => {
            NUM_WIDTH_UNIT.forEach(v => {
              str += `${md}${pseudo}.letter-spacing-${m}${v}{}`
            })
          })
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
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['shrink', 'grow'].forEach(sg => {
            [...NUM_ENMU, 'initial', 'inherit'].forEach(v => {
              str += `${md}${pseudo}.flex-${sg}-${v}{}`
            })
          })
        })
      })
      return str
    }
  },
  {
    className: 'flex-basis',
    // regExp: new RegExp(`^flex-basis-((0|1|1(${UNIT_ENMU_STR})?)|initial|inherit|auto)$`),
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          [...NUM_WIDTH_UNIT, 'initial', 'inherit', 'auto'].forEach(v => {
            str += `${md}${pseudo}.flex-basis-${v}{}`
          })
        })
      })
      return str
    }
  },
  {
    className: 'border',
    // 这个宽度没有百分比
    // regExp: new RegExp(`^(border|border-width|border-w)-([trblxy]-)?(0|1|1(${UNIT_ENMU_STR})?)$`),
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['border', 'border-width', 'border-w'].forEach(bw => {
            ['t-', 'r-', 'b-', 'l-', 'x-', 'y-', ''].forEach(trblxy => {
              NUM_WIDTH_UNIT.forEach(v => {
                str += `${md}${pseudo}.${bw}-${trblxy}${v}{}`
              })
            })
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
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['border-radius', 'br'].forEach(br => {
            NUM_WIDTH_UNIT.forEach(v => {
              str += `${md}${pseudo}.${br}-${v}{}`
            })
          })
        })
      })
      return str
    }
  },
  {
    className: 'border-style',
    // regExp: /^border-style-(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|inherit)$/,
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'inherit'].forEach(v => {
            str += `${md}${pseudo}.border-style-${v}{}`
          })
        })
      })
      return str
    }
  },
  {
    className : 'text-align-last',
    regExp    : /^(text-align-last|text-last)-(auto|left|right|center|justify|start|end|initial|inherit)$/,
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['text-align-last', 'text-last'].forEach(tl => {
            ['auto', 'left', 'right', 'center', 'justify', 'start', 'end', 'initial', 'inherit'].forEach(v => {
              str += `${md}${pseudo}.${tl}-${v}{}`
            })
          })
        })
      })
      return str
    }
  },
  {
    className : 'text-decoration',
    regExp    : /^(text-decoration|text)-(none|underline|overline|line-through|blink|inherit)$/,
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['text-decoration', 'text'].forEach(text => {
            ['none', 'underline', 'overline', 'line-through', 'blink', 'inherit'].forEach(v => {
              str += `${md}${pseudo}.${text}-${v}{}`
            })
          })
        })
      })
      return str
    }
  },
  {
    className : 'user-select',
    regExp    : /^user-select-(none|auto|text|all|contain|element)$/,
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['user-select', 'select'].forEach(s => {
            ['none', 'auto', 'text', 'all', 'contain', 'element'].forEach(v => {
              str += `${md}${pseudo}.${s}-${v}{}`
            })
          })
        })
      })
      return str
    }
  },
  {
    className: 'text-ellipsis-num',
    // regExp: /^(text-)?ellipsis(-(0|1))?$/,
    render () {
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['ellipsis', 'text', 'text-ellipsis'].forEach(t => {
            ['', ...NUM_ENMU].forEach(n => {
              str += `${md}${pseudo}.${t}-${n}{}`
            })
          })
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
      let str = ''
      MEIDA_QUERYS.forEach(md => {
        PSEUDO_LIST.forEach(pseudo => {
          ['color', 'c', 'text', 'bg', 'background', 'border-color', 'border-c'].forEach(t => {
            ['ff0', 'fafafa', 'red', 'transparent'].forEach(c => {
              ['', '-65', '-85'].forEach(o => {
                str += `${md}${pseudo}.${t}-${c}${o}{}`
              })
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
