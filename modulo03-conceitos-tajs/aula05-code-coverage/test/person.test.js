import { it, describe, expect, beforeEach, afterEach, jest } from '@jest/globals'
import { mapPerson } from '../src/person.js'

describe('Person Test Suite', () => {
  describe('happy path', () => {
    it('should map person', () => {
      const personStr = '{"name":"andersonnascimento","age":32}'
      const personObj = mapPerson(personStr)

      expect(personObj).toEqual({
        name: 'andersonnascimento',
        age: 32,
        createdAt: expect.any(Date)
      })
    })
  })

  describe('what coverage doesn\'t tell you', () => {
    // it('should not map person given invalid JSON String', () => {
    //   const personStr = '{"name":"andersonnascimento","age":32'

    //   expect(() => mapPerson(personStr)).toThrow('Unexpected end of JSON input')
    // })
    // it('should not map person given invalid JSON data', () => {
    //   const personStr = '{}'
    //   const personObj = mapPerson(personStr)

    //   expect(personObj).toEqual({
    //     name: undefined,
    //     age: undefined,
    //     createdAt: expect.any(Date)
    //   })
    // })
    it('should not map person given invalid JSON data', () => {
      const personStr = '{}'
      const mappedPerson =  mapPerson(personStr)
      expect(mappedPerson).toStrictEqual({
        name: 'Name is required',
        age: 'Age is required',
      })
    })
    it('should not map person given invalid JSON data', () => {
      const personStr = '{"name": 123, "age": "32"}'
      const mappedPerson =  mapPerson(personStr)
      expect(mappedPerson).toStrictEqual({
        name: 'Name must be a string',
        age: 'Age must be a number',
      })
    })
  })
})