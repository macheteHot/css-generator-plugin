const { Random } = require('mockjs')
const { getConfig, setConfig } = require('../../bin/config')

describe('测试默认配置', () => {
  it('获取默认单位', () => {
    expect(getConfig('unit')).toBe('px')
  })
  it('设置默认单位', () => {
    const unit = Random.word()
    setConfig({ unit })
    expect(getConfig('unit')).toBe(unit)
  })
})
