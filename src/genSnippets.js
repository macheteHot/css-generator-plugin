import {
  JUSTIFY_CONTENT_ENUM,
  ALIGN_ITEMS_ENUM,
  CURSOR_ENUM,
  VERTICAL_ALIGN_ENUM
} from './constant'
const fs = require('fs')
const path = require('path')
const NUM_ENUM = [1, 2]
const UNIT_ENUM = ['', 'p', 'rem', 'vh']
const NUM_WIDTH_UNIT = [1, 2, '1p', '1rem', '1vh']

function getRegList () {
  return [
    {
      className: 'widthOrHeight',
      render () {
        let widthOrHeight = '';
        ['w', 'h'].forEach(d => {
          NUM_ENUM.forEach(n => {
            UNIT_ENUM.forEach(u => {
              widthOrHeight += `.${d}-${n}${u}{}`
            })
          })
        })
        return widthOrHeight
      }
    },
    {
      className: 'square',
      render () {
        let square = ''
        NUM_ENUM.forEach(n => {
          UNIT_ENUM.forEach(u => {
            square += `.square-${n}${u}{}`
          })
        })
        return square
      }
    },
    {
      className: 'minMaxWidthOrHeight',
      render () {
        let minMaxWidthOrHeight = '';
        ['min', 'max'].forEach(mm => {
          ['w', 'h'].forEach(wh => {
            NUM_ENUM.forEach(n => {
              UNIT_ENUM.forEach(u => {
                minMaxWidthOrHeight += `.${mm}-${wh}-${n}${u}{}`
              })
            })
          })
        })
        return minMaxWidthOrHeight
      }
    },
    {
      className: 'objectFit',
      render () {
        let objectFit = '';
        ['fill', 'contain', 'cover', 'none', 'scale-down', 'inherit', 'initial', 'revert', 'unset'].forEach(val => {
          objectFit += `.object-fit-${val}{}`
        })
        return objectFit
      }
    },
    {
      className: 'marginOrPadding',
      render () {
        let marginOrPadding = '';
        ['m', 'p'].forEach(mp => {
          ['t-', 'r-', 'b-', 'l-', 'x-', 'y-', ''].forEach(trblxy => {
            ['m-', ''].forEach(m => {
              NUM_ENUM.forEach(n => {
                UNIT_ENUM.forEach(u => {
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
      render () {
        let zIndex = '';
        ['m-', ''].forEach(m => {
          NUM_ENUM.forEach(n => {
            zIndex += `.z-index-${m}${n}{}`
          })
        })
        return zIndex
      }
    },
    {
      // flex-1 flex-9999
      className: 'flexNum',
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
    {
      className: 'line-height',
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
      render () {
        let str = ''
        JUSTIFY_CONTENT_ENUM.forEach(jc => {
          ALIGN_ITEMS_ENUM.forEach(ai => {
            str += `.flex-${jc}-${ai}{}`
          })
        })
        return str
      }
    },
    {
      className: 'justify-content',
      render () {
        let str = ''
        JUSTIFY_CONTENT_ENUM.forEach(jc => {
          str += `.justify-content-${jc}{}`
        })
        return str
      }
    },
    {
      className: 'align-items',
      render () {
        let str = ''
        ALIGN_ITEMS_ENUM.forEach(ai => {
          str += `.justify-content-${ai}{}`
        })
        return str
      }
    },
    {
      className: 'flex-direction',
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
      render () {
        let str = '';
        ['static', 'relative', 'sticky', 'unset', 'absolute', 'fixed', 'inherit', 'initial'].forEach(v => {
          str += `.position-${v}{}`
        })
        return str
      }
    },
    {
      // 透明度
      className: 'opacity',
      render () {
        let str = ''
        const list = [20, 80, 100]
        list.forEach(n => {
          str += `.opacity-${n}{}`
        })
        return str
      }
    },
    {
      className: 'opacity',
      render () {
        let str = '';
        [20, 80, 100].forEach(n => {
          str += `.opacity-${n}{}`
        })
        return str
      }
    },
    {
      // 绝对定位 方向 t-20vh top:20vh -m负数
      className: 'orientation',
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
      render () {
        let str = ''
        CURSOR_ENUM.forEach(v => {
          str += `.cursor-${v}{}`
        })
        return str
      }
    },
    {
      // 文字折叠
      className: 'word-break',
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
      render () {
        let str = '';
        ['font-size', 'fs'].forEach(fs => {
          NUM_ENUM.forEach(n => {
            UNIT_ENUM.forEach(u => {
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
      render () {
        let str = '';
        ['display', 'd'].forEach(d => {
          ['none', 'inline', 'block', 'inline-block', 'flex', 'inherit', 'initial', 'none', 'revert', 'unset'].forEach(v => {
            str += `.${d}-${v}{}`
          })
        })
        return str
      }
    },
    // overflow
    {
      className: 'overflow',
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
      render () {
        return '.circle'
      }
    },
    {
      className: 'flexShrinkAndGrow',
      render () {
        let str = '';
        ['shrink', 'grow'].forEach(sg => {
          [...NUM_ENUM, 'initial', 'inherit'].forEach(v => {
            str += `.flex-${sg}-${v}{}`
          })
        })
        return str
      }
    },
    {
      className: 'flex-basis',
      render () {
        let str = ''
        const list = [...NUM_WIDTH_UNIT, 'initial', 'inherit', 'auto']
        list.forEach(v => {
          str += `.flex-basis-${v}{}`
        })
        return str
      }
    },
    {
      className: 'border',
      // 这个宽度没有百分比
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
      className: 'vertical-align',
      render () {
        let str = '';
        [...VERTICAL_ALIGN_ENUM, ...NUM_WIDTH_UNIT].forEach(s => {
          str += `.vertical-align-${s}{}`
        })
        return str
      }
    },
    {
      className: 'text-ellipsis-num',
      render () {
        let str = '';
        ['ellipsis', 'text', 'text-ellipsis'].forEach(t => {
          ['', ...NUM_ENUM].forEach(n => {
            str += `.${t}-${n}{}`
          })
        })
        return str
      }
    },
    {
      // 所有有关颜色的
      className: 'color',
      render () {
        let str = '';
        ['color', 'c', 'text', 'bg', 'background', 'border-color', 'border-c'].forEach(t => {
          ['ff0', '#fafafa', 'red', 'transparent'].forEach(c => {
            ['', '-65', '-85'].forEach(o => {
              str += `.${t}-${c}${o}{}`
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
