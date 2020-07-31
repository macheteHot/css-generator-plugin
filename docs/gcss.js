#!/usr/bin/env node

(function () {
  'use strict';

  const COLORS = 'colors'; // 选填
  const UNIT = 'unit'; // 选填 单位
  const IMPORTANT = 'important'; // 选填 单位
  // 以下是项目配置 不从配置文件读
  const EXT_NAME = 'extNames';
  const GLOB_REG = 'globReg';
  const MODIFY_RULES = 'modifyRules';
  // 以下是枚举

  const JUSTIFY_CONTENT_ENMU = ['center', 'start', 'end', 'flex-start', 'flex-end', 'left', 'right', 'space-between', 'between', 'space-around', 'around', 'space-evenly', 'evenly', 'stretch', 'inherit', 'initial', 'unset', 'normal'];
  const ALIGN_ITEMS_ENMU = ['baseline', 'center', 'end', 'flex-end', 'flex-start', 'inherit', 'initial', 'normal', 'self-end', 'self-start', 'start', 'stretch', 'unset'];

  const CURSOR_ENMU = ['auto', 'default', 'none', 'context-menu', 'help', 'pointer', 'progress', 'wait', 'cell', 'crosshair', 'text', 'vertical-text', 'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'e-resize', 'n-resize', 'ne-resize', 'nw-resize', 's-resize', 'se-resize', 'sw-resize', 'w-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'col-resize', 'row-resize', 'all-scroll', 'zoom-in', 'zoom-out', 'grab', 'grabbing'];

  const UNIT_ENMU = ['cm', 'mm', 'in', 'px', 'pt', 'pc', 'em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'p'];
  const JUSTIFY_CONTENT_ENMU_STR = JUSTIFY_CONTENT_ENMU.join('|');
  const ALIGN_ITEMS_ENMU_STR = ALIGN_ITEMS_ENMU.join('|');
  const CURSOR_ENMU_STR = CURSOR_ENMU.join('|');
  const UNIT_ENMU_STR = UNIT_ENMU.join('|');

  const DIRECTION_MAP = new Map();
  DIRECTION_MAP.set(undefined, ['']); // 全部
  DIRECTION_MAP.set('x', ['left', 'right']);
  DIRECTION_MAP.set('y', ['top', 'bottom']);
  DIRECTION_MAP.set('t', ['top']);
  DIRECTION_MAP.set('r', ['right']);
  DIRECTION_MAP.set('b', ['bottom']);
  DIRECTION_MAP.set('l', ['left']);
  DIRECTION_MAP.set('top', ['top']);
  DIRECTION_MAP.set('right', ['right']);
  DIRECTION_MAP.set('bottom', ['bottom']);
  DIRECTION_MAP.set('left', ['left']);

  /**
   * order 220
   */
  var alignItems = {
    regExp: new RegExp(`^align-items-(?<align>${ALIGN_ITEMS_ENMU_STR})$`),
    render ({ groups }) {
      const { align } = groups;
      return { name: 'alignItems', order: 220, css: [`align-items: ${align}`] }
    }
  };

  let programConfig = {
    [MODIFY_RULES]: {}
  };
  const runType = {
    vue: {
      [EXT_NAME]: ['vue'],
      reg: /((?<=class=(["']))[\s\S]*?(?=\2))|((?<=class={)[\s\S]*?(?=}))/gi
    },
    react: {
      [EXT_NAME]: ['tsx', 'jsx'],
      reg: /((?<=className=(["']))[\s\S]*?(?=\2))|((?<=className={)[\s\S]*?(?=}))/gi
    },
    'd-mini-program': { // 钉钉小程序
      [EXT_NAME]: ['axml'],
      reg: /((?<=class=")|(?<=classname="))[\s\S]+?(?=")/gi
    },
    'wx-mini-program': { // 微信小程序
      [EXT_NAME]: ['wxml'],
      reg: /((?<=class=")|(?<=classname="))[\s\S]+?(?=")/gi
    },
    html: { // 单纯 html
      [EXT_NAME]: ['html'],
      reg: /((?<=class=(["']))[\s\S]*?(?=\2))/gi
    }
  };
  function getConfig (str) {
    switch (str) {
      // 此处配置默认值
      case EXT_NAME:
        return runType[programConfig.type][EXT_NAME]
      case GLOB_REG:
        return runType[programConfig.type].reg
      case COLORS: // 默认空对象
        return programConfig[COLORS] || {}
      case UNIT: // 默认px
        return programConfig[UNIT] || 'px'
      case IMPORTANT: // 默认添加！important 设置默认值
        return programConfig[IMPORTANT] === undefined ? true : programConfig[IMPORTANT]
      default: // dirPath generate  等项目配置
        return programConfig[str]
    }
  }

  function setConfig (config) {
    programConfig = config;
  }
  function getUnit (str) {
    if (str === 'p') {
      return '%'
    }
    if (!str) {
      return programConfig[UNIT] || 'px'
    }
    return str
  }

  /**
   * order 520 460 + 60
   */

  function getOrder (direction) {
    let order = 460;
    if (direction === 'x') {
      order += 10;
    }
    if (direction === 'y') {
      order += 20;
    }
    if (direction === 't') {
      order += 30;
    }
    if (direction === 'b') {
      order += 40;
    }
    if (direction === 'r') {
      order += 50;
    }
    if (direction === 'l') {
      order += 60;
    }
    return order
  }

  function getCss (direction, num, unit) {
    return DIRECTION_MAP
      .get(direction)
      .reduce((t, c) => {
        if (c) {
          return [...t, `border-${c}-width: ${num}${unit}`, `border-${c}-style: solid`, `border-${c}-style: solid`]
        } else {
          return [...t, `border-width: ${num}${unit}`, 'border-style: solid', 'border-style: solid']
        }
      }, [])
  }

  var border = {
    regExp: new RegExp(`^(border|border-width|border-w)-((?<direction>[trblxy])-)?(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
    render ({ groups }) {
      let { direction, num, unit } = groups;
      if (parseInt(num) === 0) {
        unit = '';
      } else {
        unit = getUnit(unit);
      }
      return {
        name: 'border',
        order: getOrder(direction),
        num,
        css: getCss(direction, num, unit)
      }
    }
  };

  /**
   * order 530
   */

  var borderRadius = {
    regExp: new RegExp(`^(border-radius|br)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
    render ({ groups }) {
      let { num, unit } = groups;
      unit = getUnit(unit);
      return {
        name: 'borderRadius',
        order: 530,
        css: parseInt(num) === 0 ? ['border-radius: 0'] : [`border-radius: ${num}${unit}`]
      }
    }
  };

  /**
   * order 550
   */

  var borderStyle = {
    regExp: /^border-style-(?<value>none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|inherit)$/,
    render ({ groups }) {
      const { value } = groups;
      return {
        name: 'borderStyle',
        order: 550,
        css: [`border-style: ${value}`]
      }
    }
  };

  /**
   * order 560
   */

  var boxSizing = {
    regExp: /^box-sizing-(?<value>content-box|border-box)$/,
    render ({ groups }) {
      const { value } = groups;
      return {
        name: 'boxSizing',
        order: 560,
        css: [`box-sizing: ${value}`]
      }
    }
  };

  /**
   * order 540
   */

  var circle = {
    regExp: /^circle$/,
    render () {
      return {
        name: 'circle',
        order: 540,
        css: ['border-radius: 50%']
      }
    }
  };

  const colorStore = () => ({
    red: '#f00',
    white: '#fff',
    black: '#000',
    blue: '#00f',
    transparent: 'transparent',
    ...getConfig(COLORS)
  });

  function getColorsKey () {
    return Object.keys(colorStore())
  }

  function radix16 (value) {
    return parseInt(value, 16)
  }

  function textToRgbText (str, opacity = 1) {
    const hex = /^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(str) // is hex text or word
      ? str
      : colorStore()[str].replace(/^#/, '');
    if (hex === 'transparent') {
      return 'transparent'
    }
    if (hex.length === 3) {
      return 'rgba(' + hex
        .split('')
        .map(x => radix16(x.repeat(2)))
        .join(',') +
        `,${opacity})`
    }
    if (hex.length === 6) {
      const reg = /[a-fA-F0-9]{2}/g;
      return 'rgba(' + hex
        .match(reg)
        .map(radix16)
        .join(',') +
        `,${opacity})`
    }
    return ''
  }

  /**
   * order Infinity
   */

  var color = {
    regExp: () => new RegExp(
      `^(?<type>color|c|text|bg|background|border-color|border-c)-((?<pseudo>hover|link|visited|active|focus|focus-within)-)?(?<color>[a-fA-F0-9]{6}|[a-fA-F0-9]{3}|${getColorsKey().join('|')})(-(?<opacity>1|([1-9]\\d{0,1})))?$`),
    render ({ groups }) {
      let { type, pseudo, color, opacity } = groups;
      opacity = opacity === undefined ? 1 : (opacity * 0.01).toFixed(2);
      color = textToRgbText(color, opacity); // rgba(xxxx) or transparent
      let perfix = '';
      switch (type) {
        case 'c':
        case 'color':
        case 'text':
          perfix = 'color';
          break
        case 'bg':
        case 'background':
          perfix = 'background-color';
          break
        case 'border-c':
        case 'border-color':
          perfix = 'border-color';
          break
        default:
          perfix = type;
          break
      }
      // put pesudo maybe undefind or string
      return { name: 'color', order: Infinity, pseudo, css: [`${perfix}: ${color}`] }
    }
  };

  /**
   * order 340
   */

  var cursor = {
    regExp: new RegExp(`^cursor-(?<value>${CURSOR_ENMU_STR})$`),
    render ({ groups }) {
      const { value } = groups;
      return {
        name: 'cursor',
        order: 340,
        css: [`cursor: ${value}`]
      }
    }
  };

  /**
   * order 290
   */

  var display = {
    regExp: /^(display|d)-(?<value>none|inline|block|inline-block|flex)$/,
    render ({ groups }) {
      const { value } = groups;
      return {
        name: 'display',
        order: 280,
        css: [`display: ${value}`]
      }
    }
  };

  /**
   * order 280
   */

  var flexBasis = {
    regExp: new RegExp(`^flex-basis-(?<value>((?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?)|initial|inherit|auto)$`),
    render ({ groups }) {
      let { value, num, unit } = groups;
      if (num) {
        unit = getUnit(unit);
        value = `${num}${unit}`;
      }
      return {
        name: 'flexBasis',
        order: 280,
        css: [`flex-basis: ${value}`]
      }
    }
  };

  /**
   * order 230
   */
  var flexDirection = {
    regExp: /^(flex-direction|flex)-(?<value>row|row-reverse|column|column-reverse)$/,
    render ({ groups }) {
      const { value } = groups;
      return { name: 'flexDirection', order: 230, css: [`flex-direction: ${value}`] }
    }
  };

  /**
   * order 200
   */
  var flexJustAli = {
    regExp: new RegExp(`^flex-(?<justify>${JUSTIFY_CONTENT_ENMU_STR})-(?<align>${ALIGN_ITEMS_ENMU_STR})$`),
    render ({ groups }) {
      let { justify, align } = groups;
      if (justify === 'between') {
        justify = 'space-between';
      }
      if (justify === 'around') {
        justify = 'space-around';
      }
      if (justify === 'evenly') {
        justify = 'space-evenly';
      }
      return {
        name: 'flexJustAli',
        order: 200,
        css: ['display: flex', `justify-content: ${justify}`, `align-items: ${align}`]
      }
    }
  };

  /**
   * order 250
   */
  var flexNum = {
    regExp: /^flex-(?<value>null|auto|none|(0|[1-9]\d*))$/,
    render ({ groups }) {
      const { value } = groups;
      return { name: 'flex', order: 250, css: [`flex: ${value}`] }
    }
  };

  /**
   * order 260-270
   */
  var flexShrinkAndGrow = {
    regExp: /^flex-(?<type>shrink|grow)-(?<value>(0|[1-9]\d*)|initial|inherit)$/,
    render ({ groups }) {
      const { type, value } = groups;
      return {
        name: type === 'shrink' ? 'flexShrink' : 'flexGrow',
        order: type === 'shrink' ? 260 : 270,
        css: [`flex-${type}: ${value}`]
      }
    }
  };

  /**
   * order 240
   */
  var flexWrap = {
    regExp: /^flex-wrap-(?<value>inherit|initial|nowrap|wrap|wrap-reverse)$/,
    render ({ groups }) {
      const { value } = groups;
      return { name: 'flexDirection', order: 240, css: [`flex-wrap: ${value}`] }
    }
  };

  /**
   * order 370
   */

  var fontSize = {
    regExp: new RegExp(`^(font-size|fs)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
    render ({ groups }) {
      let { num, unit } = groups;
      unit = getUnit(unit);
      const base = { name: 'fontSize', order: 370, num };
      return parseInt(num) === 0
        ? { ...base, css: ['font-size: 0'] }
        : { ...base, css: [`font-size: ${num}${unit}`] }
    }
  };

  /**
   * order 360
   */
  var fontWeight = {
    regExp: /^(font-weight|fw)-(?<value>[1-9]00|normal|bold|bolder|inherit|initial|lighter|normal|unset)$/,
    render ({ groups }) {
      const { value } = groups;
      return {
        name: 'fontWeight',
        order: 360,
        css: [`font-weight: ${value}`]
      }
    }
  };

  /**
   * order 20
   */

  var height = {
    regExp: new RegExp(`^(h|height)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
    render ({ groups }) {
      const { num, unit } = groups;
      const base = { name: 'height', order: 20, num };
      return parseInt(num) === 0
        ? { ...base, css: ['height: 0'] }
        : { ...base, css: [`height: ${num}${getUnit(unit)}`] }
    }
  };

  /**
   * order 210
   */
  var justifyContent = {
    regExp: new RegExp(`^justify-content-(?<justify>${JUSTIFY_CONTENT_ENMU_STR})$`),
    render ({ groups }) {
      const { justify } = groups;
      return { name: 'justifyContent', order: 210, css: [`justify-content: ${justify}`] }
    }
  };

  /**
   * order 410
   */
  var letterSpacing = {
    regExp: new RegExp(`^letter-spacing-(?<isMinus>m-)?(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
    render ({ groups }) {
      let { isMinus, num, unit } = groups;
      if (isMinus) {
        num = 0 - num;
      }
      unit = getUnit(unit);
      const base = { name: 'letterSpacing', order: 410, num };
      return {
        ...base,
        css: parseInt(num) !== 0
          ? [`letter-spacing: ${num}${unit}`]
          : ['letter-spacing: 0']
      }
    }
  };

  /**
   * order 330
   */

  var lineHeight = {
    regExp: new RegExp(`^(lh|line-height)-(?<value>((?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?)|normal|unset|inherit|initial)$`),
    render ({ groups }) {
      let { value, num, unit } = groups;
      const base = { name: 'lineHeight', order: 330 };
      if (parseInt(num) === 0) { // 如果num 是0 就不管其他的了
        return { ...base, num, css: ['line-height: 0'] }
      }
      if (num !== undefined) { // 如果有数字 就转换单位
        unit = getUnit(unit);
        return { ...base, num, css: [`line-height: ${num}${unit}`] }
      }
      return { ...base, num: Infinity, css: [`line-height: ${value}`] }
    }
  };

  /**
   * 50 - 180 order
   */

  function getConfig$1 (type, direction) {
    let order;
    let name = '';
    if (type === 'm' || type === 'margin') {
      order = 50;
      name += 'margin';
    }
    // 单项加 60 order m-l-10 最大为50 + 60 padding 从 120 起
    if (type === 'p' || type === 'padding') {
      order = 110;
      name += 'padding';
    }
    if (direction === 'x') {
      order += 10;
    }
    if (direction === 'y') {
      order += 20;
    }
    if (direction === 't') {
      order += 30;
    }
    if (direction === 'b') {
      order += 40;
    }
    if (direction === 'r') {
      order += 50;
    }
    if (direction === 'l') {
      order += 60;
    }
    if (direction) {
      name += `-${direction}`;
    }
    return { name, order }
  }

  var marginAndPadding = {
    regExp: new RegExp(`^(?<type>m|margin|p|padding)-((?<direction>[trblxy])-)?((?<auto>auto)|(?<isMinus>m-)?(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?)$`),
    render ({ groups }) {
      let { type, direction, isMinus, num, unit, auto } = groups;
      if (auto) {
        unit = '';
        num = 'auto';
      } else if (parseInt(num) === 0) {
        unit = '';
      } else {
        unit = getUnit(unit);
      }
      // if has auto never has isMinus
      if (isMinus) {
        num = 0 - num;
      }
      const baseConfig = getConfig$1(type, direction);
      if (type === 'm') {
        type = 'margin';
      }
      if (type === 'p') {
        type = 'padding';
      }
      return {
        ...baseConfig,
        num,
        css: DIRECTION_MAP
          .get(direction)
          .reduce((t, c) =>
            [...t, c ? `${type}-${c}: ${num}${unit}` : `${type}: ${num}${unit}`], [])
      }
    }
  };

  /**
   * order 31
   */
  var maxHeight = {
    regExp: new RegExp(`^(max-h|max-height)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
    render ({ groups }) {
      let { num, unit } = groups;
      unit = getUnit(unit);
      const base = { name: 'max-height', order: 31, num };
      return parseInt(num === 0)
        ? { ...base, css: ['max-height: 0'] }
        : { ...base, css: [`max-height: ${num}${unit}`] }
    }
  };

  /**
   * order 31
   */
  var maxWidth = {
    regExp: new RegExp(`^(max-w|max-width)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
    render ({ groups }) {
      let { num, unit } = groups;
      unit = getUnit(unit);
      const base = { name: 'max-width', order: 31, num };
      return parseInt(num === 0)
        ? { ...base, css: ['max-width: 0'] }
        : { ...base, css: [`max-width: ${num}${unit}`] }
    }
  };

  /**
   * order 40
   */

  var minHeight = {
    regExp: new RegExp(`^(min-h|min-height)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
    render ({ groups }) {
      let { num, unit } = groups;
      unit = getUnit(unit);
      const base = { name: 'min-height', order: 40, num };
      return parseInt(num === 0)
        ? { ...base, css: ['min-height: 0'] }
        : { ...base, css: [`min-height: ${num}${unit}`] }
    }
  };

  /**
   * order 41
   */
  var minWidth = {
    regExp: new RegExp(`^(min-w|min-width)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
    render ({ groups }) {
      let { num, unit } = groups;
      unit = getUnit(unit);
      const base = { name: 'min-width', order: 41, num };
      return parseInt(num === 0)
        ? { ...base, css: ['min-width: 0'] }
        : { ...base, css: [`min-width: ${num}${unit}`] }
    }
  };

  /**
   * order 310
   */

  var orientation = {
    regExp: new RegExp(`^(?<direction>[trbl]|top|right|bottom|left)-(?<isMinus>m-)?(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
    render ({ groups }) {
      let { direction, isMinus, num, unit } = groups;
      if (isMinus) {
        num = 0 - num;
      }
      unit = getUnit(unit);
      if (direction === 't') {
        direction = 'top';
      }
      if (direction === 'r') {
        direction = 'right';
      }
      if (direction === 'b') {
        direction = 'bottom';
      }
      if (direction === 'l') {
        direction = 'left';
      }
      const base = { name: 'orientation', order: 310, num };
      return num === 0
        ? { ...base, css: [`${direction}: 0`] }
        : { ...base, css: [`${direction}: ${num}${unit}`] }
    }
  };

  /**
   * order 380 - 400
   */

  var overflow = {
    regExp: /^overflow(-(?<direction>x|y))?-(?<value>hidden|auto|visible|scroll|inherit)$/,
    render ({ groups }) {
      const { direction, value } = groups;
      const base = { name: 'overflow' };
      if (!direction) {
        return { ...base, order: 380, css: [`overflow: ${value}`] }
      }
      if (direction === 'x') {
        return { ...base, order: 390, css: [`overflow-x: ${value}`] }
      }
      if (direction === 'y') {
        return { ...base, order: 400, css: [`overflow-y: ${value}`] }
      }
    }
  };

  /**
   * order 300
   */

  var position = {
    regExp: /^position-(?<value>static|relative|sticky|unset|absolute|fixed|inherit|initial)$/,
    render ({ groups }) {
      const { value } = groups;
      return {
        name: 'position',
        order: 300,
        css: [`position: ${value}`]
      }
    }
  };

  /**
   * order 50
   */
  var square = {
    className: 'square',
    regExp: new RegExp(`^square-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
    render ({ groups }) {
      let { num, unit } = groups;
      unit = getUnit(unit);
      const base = { name: 'square', order: 50, num };
      return parseInt(num === 0)
        ? { ...base, css: ['width: 0', 'height: 0'] }
        : { ...base, css: [`width: ${num}${unit}`, `height: ${num}${unit}`] }
    }
  };

  /**
   * order 320
   */

  var textAlign = {
    regExp: /^(text-align|text)-(?<value>start|end|left|right|center|justify|match-parent)$/,
    render ({ groups }) {
      const { value } = groups;
      return {
        name: 'textAlign',
        order: 320,
        css: [`text-align: ${value}`]
      }
    }
  };

  /**
   * order 440
   */

  var textAlignLast = {
    regExp: /^(text-align-last|text-last)-(?<value>auto|left|right|center|justify|start|end|initial|inherit)$/,
    render ({ groups }) {
      const { value } = groups;
      return {
        name: 'textAlignLast',
        order: 440,
        css: [`text-align-last: ${value}`]
      }
    }
  };

  /**
   * order 420
   */

  var textDecoration = {
    regExp: /^(text-decoration|text)-(?<value>none|underline|overline|line-through|blink|inherit)$/,
    render ({ groups }) {
      const { value } = groups;
      return {
        name: 'textDecoration',
        order: 420,
        css: [`text-decoration: ${value}`]
      }
    }
  };

  /**
   * order 450
   */

  var textEllipsis = {
    regExp: /^(text-)?ellipsis(-(?<num>[1-9]\d*))?$/,
    render ({ groups }) {
      let { num } = groups;
      const base = { name: '', order: 450 };
      if (parseInt(num) === 1) {
        num = undefined; // 和没写是一样的
      }
      if (num === undefined) {
        return {
          ...base,
          num: 0,
          css: [
            'display: inline-block',
            'overflow: hidden',
            'text-overflow: ellipsis',
            'white-space: nowrap'
          ]
        }
      } else {
        return {
          ...base,
          num,
          css: [
            'overflow: hidden',
            'text-overflow: ellipsis',
            'display: -webkit-box',
            `-webkit-line-clamp: ${num}`,
            '-webkit-box-orient: vertical'
          ]
        }
      }
    }
  };

  /**
   * order 430
   */

  var userSelect = {
    regExp: /^(user-)?select-(?<value>none|auto|text|all|contain|element)$/,
    render ({ groups }) {
      const { value } = groups;
      return {
        name: 'userSelect',
        order: 430,
        css: [`user-select: ${value}`]
      }
    }
  };

  /**
   * order 10
   */
  var width = {
    regExp: new RegExp(`^(w|width)-(?<num>0|[1-9]\\d*)(?<unit>${UNIT_ENMU_STR})?$`),
    render ({ groups }) {
      const { num, unit } = groups;
      const base = { name: 'width', order: 10, num };
      return parseInt(num) === 0
        ? { ...base, css: ['width: 0'] }
        : { ...base, css: [`width: ${num}${getUnit(unit)}`] }
    }
  };

  /**
   * order 350
   */

  var wordBreak = {
    regExp: /^word-break-(?<value>normal|break-all|keep-all|break-word|inherit|initial|unset)$/,
    render ({ groups }) {
      const { value } = groups;
      return {
        name: 'wordBreak',
        order: 350,
        css: [`word-break: ${value}`]
      }
    }
  };

  /**
   * order 190
   */
  var zIndex = {
    regExp: /^z-index-(?<isMinus>m-)?(?<num>0|[1-9]\d*)$/,
    render ({ groups }) {
      let { isMinus, num } = groups;
      if (isMinus) {
        num = 0 - num;
      }
      return { name: 'zIndex', order: 190, num, css: [`z-index: ${num}`] }
    }
  };

  var rules = /*#__PURE__*/Object.freeze({
    __proto__: null,
    alignItems: alignItems,
    border: border,
    borderRadius: borderRadius,
    borderStyle: borderStyle,
    boxSizing: boxSizing,
    circle: circle,
    color: color,
    cursor: cursor,
    display: display,
    flexBasis: flexBasis,
    flexDirection: flexDirection,
    flexJustAli: flexJustAli,
    flexNum: flexNum,
    flexShrinkAndGrow: flexShrinkAndGrow,
    flexWrap: flexWrap,
    fontSize: fontSize,
    fontWeight: fontWeight,
    height: height,
    justifyContent: justifyContent,
    letterSpacing: letterSpacing,
    lineHeight: lineHeight,
    marginAndPadding: marginAndPadding,
    maxHeight: maxHeight,
    maxWidth: maxWidth,
    minHeight: minHeight,
    minWidth: minWidth,
    orientation: orientation,
    overflow: overflow,
    position: position,
    square: square,
    textAlign: textAlign,
    textAlignLast: textAlignLast,
    textDecoration: textDecoration,
    textEllipsis: textEllipsis,
    userSelect: userSelect,
    width: width,
    wordBreak: wordBreak,
    zIndex: zIndex
  });

  function isFunction (payload) {
    return typeof payload === 'function'
  }

  function groupBy (array, name) {
    const groups = {};
    array.forEach(function (o) {
      const group = JSON.stringify(o[name]);
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group]
    })
  }

  let preArry = [];

  function pushPreObj (obj) {
    return preArry.push(obj)
  }

  function getCssSingle ({ classStr, pseudo, css }) {
    if (pseudo) {
      classStr = classStr + `:${pseudo}`;
    }
    return css.reduce((t, c, i) => {
      return t + (getConfig(IMPORTANT) ? `${c} !important; ` : `${c}; `)
    }, `.${classStr}{ `) + '}'
  }

  function sortCss (a, b) {
    if (a !== undefined && b !== undefined) {
      return parseInt(a.num) - parseInt(b.num)
    } else {
      return 0
    }
  }

  function renderCss () {
    let cssStr = '';
    const cssObject = groupBy(preArry.sort((a, b) => a.order - b.order), 'name');
    for (const key in cssObject) {
      if (Object.prototype.hasOwnProperty.call(cssObject, key)) {
        cssStr += `/* ${cssObject[key][0].name || 'unknow name'} order ${cssObject[key][0].order} */\n`;
        cssStr += cssObject[key]
          .sort(sortCss)
          .map(getCssSingle)
          .join('\n');
        cssStr += '\n\n';
      }
    }
    return cssStr
  }

  const cssSet = new Set();

  function filterClassNames (sourceStr) {
    // cssSet.clear() // 清空set
    // clearPreArray() // 清空预编译
    const classNameList = sourceStr.match(getConfig(GLOB_REG));
    if (classNameList) {
      classNameList.forEach(hasClassNameStr => {
        // 替换我们规则中不会出现的字符 替换成空格 注意前后必须有空格 可能导致拼接合法 会多生成几条 无所谓
        const className = hasClassNameStr.replace(/[^a-zA-Z0-9-]/g, ' ');
        className.split(' ').forEach(filterClass);
      });
    }
    return ''
  }
  function filterClass (classStr) {
    if (cssSet.has(classStr)) {
      return null
    }
    cssSet.add(classStr);
    Object.values({ ...rules, ...getConfig(MODIFY_RULES) }).forEach((rule) => {
      rule = isFunction(rule) ? rule({ getUnit }) : rule;
      const reg = isFunction(rule.regExp) ? rule.regExp() : rule.regExp;
      const res = classStr.match(reg);
      if (res !== null) {
        pushPreObj({ classStr, ...rule.render(res) });
      }
    });
  }

  const NODE_ID = 'autocss';

  function genCss () {
    const sourceStr = document.body.innerHTML;
    filterClassNames(sourceStr);
    const oldStyleNode = document.getElementById(NODE_ID);
    if (oldStyleNode) {
      oldStyleNode.remove();
    }
    const style = document.createElement('style');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.setAttribute('id', NODE_ID);
    style.appendChild(document.createTextNode(renderCss()));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  window.Gcss = class {
    constructor (cfg = {}) {
      setConfig({ ...cfg, type: 'html' });
      this.str = '';
    }

    start () {
      genCss();
      // eslint-disable-next-line no-undef
      const observer = new MutationObserver(genCss);
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
        childList: true,
        subtree: true
      });
    }
  };

  window.getCssStr = renderCss;

}());
