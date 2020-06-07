const { getCss } = require('../utils')

describe('测试margin和padding直接数值', () => {
  it('margin直接数值', () => {
    expect(getCss('m-12')).toBe('.m-12{margin:12px;}')
  })
  it('margin直接大数值', () => {
    expect(getCss('m-238901283901823908129038')).toBe('.m-238901283901823908129038{margin:238901283901823908129038px;}')
  })
  it('padding直接大数值', () => {
    expect(getCss('p-23912389128390128390128309')).toBe('.p-23912389128390128390128309{padding:23912389128390128390128309px;}')
  })
})

describe('测试margin和padding直接负数', () => {
  it('margin直接负数', () => {
    expect(getCss('m-m-12')).toBe('.m-m-12{margin:-12px;}')
  })
  it('margin直接大负数', () => {
    expect(getCss('m-m-1231293891028390218390812938120')).toBe('.m-m-1231293891028390218390812938120{margin:-1231293891028390218390812938120px;}')
  })
  it('padding直接大负数', () => {
    expect(getCss('p-m-67839671893760813760137')).toBe('.p-m-67839671893760813760137{padding:-67839671893760813760137px;}')
  })
})

describe('测试margin和padding不合规', () => {
  it('margin 连续两个-', () => {
    expect(getCss('m--12')).toBe('')
  })
  it('padding 连续两个-', () => {
    expect(getCss('p--12')).toBe('')
  })
  it('margin 中间两个-', () => {
    expect(getCss('m-t--12')).toBe('')
  })
  it('padding 中间两个-', () => {
    expect(getCss('p-t--12')).toBe('')
  })
  it('margin 负数中间两个- ', () => {
    expect(getCss('m-t-m--12')).toBe('')
  })
  it('padding 负数中间两个- ', () => {
    expect(getCss('p-t-m--12')).toBe('')
  })
})

describe('方向测试', () => {
  it('上方测试', () => {
    expect(getCss('m-t-88')).toBe('.m-t-88{margin-top:88px;}')
  })
  it('下方测试', () => {
    expect(getCss('m-b-88')).toBe('.m-b-88{margin-bottom:88px;}')
  })
  it('左方测试', () => {
    expect(getCss('m-l-88')).toBe('.m-l-88{margin-left:88px;}')
  })
  it('右方测试', () => {
    expect(getCss('m-r-88')).toBe('.m-r-88{margin-right:88px;}')
  })
  it('横向测试', () => {
    expect(getCss('m-x-88')).toBe('.m-x-88{margin-left:88px;margin-right:88px;}')
  })
  it('纵向测试', () => {
    expect(getCss('m-y-88')).toBe('.m-y-88{margin-top:88px;margin-bottom:88px;}')
  })
})
describe('方向测试', () => {
  it('带方向负数测试', () => {
    expect(getCss('m-y-m-88')).toBe('.m-y-m-88{margin-top:-88px;margin-bottom:-88px;}')
  })
})
