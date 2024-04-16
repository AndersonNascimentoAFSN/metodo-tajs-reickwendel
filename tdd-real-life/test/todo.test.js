import { describe, it, before } from 'mocha'
import { expect } from 'chai'

import { Todo } from '../src/todo'

describe('todo', () => {
  describe('#isValid', () => {
    it('should return invalid when creating an object without text', () => {
      const data = {
        text: '',
        when: new Date('2020-12-01')
      }

      const todo = new Todo(data)

      const result = todo.isValid()

      expect(result).to.be.not.ok
    })

    it('should return invalid when creating an object using "when" property invalid', () => {
      const data = {
        text: 'Hello World',
        when: new Date('20-12-01')
      }

      const todo = new Todo(data)

      const result = todo.isValid()

      expect(result).to.be.not.ok
    })

    it('should have "id", "text", "when", "status" properties when creating an object', () => {
      const data = {
        text: 'Hello World',
        when: new Date('2020-12-01')
      }

      const todo = new Todo(data)

      const result = todo.isValid()

      expect(result).to.be.ok
    })
  })
})
