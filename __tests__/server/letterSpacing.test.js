const { getCss } = require('../utils')
const { Random } = require('mockjs')

describe('测试letter-spacing', () => {
  for (let i = 0; i < 10; i++) {
    const num = Random.integer(-99999, 9999999)
    it('letter-spacing 正负数随机测试', () => {
      if (num >= 0) {
        expect(getCss(`letter-spacing-${num}`)).toBe(`.letter-spacing-${num}{letter-spacing:${num}px;}`)
      } else {
        expect(getCss(`letter-spacing-m${num}`)).toBe(`.letter-spacing-m${num}{letter-spacing:${num}px;}`)
      }
    })
  }
})
