import { it, describe, expect } from '@jest/globals'


function sum(a, b) {
  // debugger
  return a + b
}

describe('sum', () => {
  it('should sum 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})