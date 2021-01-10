module.exports = {
  colors      : {}, // 颜色配置
  dirPath     : 'src', // 需要扫描的目录
  generate    : 'src/style/auto.css', // 生成文件位置
  type        : 'vue', // 项目类型 vue|d-mini-program
  unit        : 'px', // 默认单位
  important   : false,
  modifyRules : { // 可覆写规则 或自定义规则 详见进阶使用

  },
  meidaQuerys: { // 自定义媒体查询
    // sm : '(min-width: 640px)',
    // md : '(min-width: 768px)',
    // lg : '(min-width: 1024px)',
    // xl : '(min-width: 1280px)'
  }
}
