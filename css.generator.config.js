module.exports = {
  colors      : {}, // 颜色配置
  dirPath     : 'src', // 需要扫描的目录
  generate    : 'src/style/auto.css', // 生成文件位置
  type        : 'vue', // 项目类型 vue|d-mini-program
  unit        : 'px', // 默认单位
  important   : false,
  modifyRules : { // 可覆写规则 或自定义规则 详见进阶使用

  },
  mediaQueries: { // 自定义媒体查询
    // sm : '(min-width: 640px)',
    // md : '(min-width: 768px)',
    // lg : '(min-width: 1024px)',
    // xl : '(min-width: 1280px)'
  }
  // pxtorem: {
  //   rootValue     : 16, // 表示根元素字体大小或基于输入参数返回根元素字体大小 1px -> 1/16rem
  //   unitPrecision : 5, // 允许REM小数单位精度
  //   minPixelValue : 1 // 不会被转换的最小像素值
  // }
}
