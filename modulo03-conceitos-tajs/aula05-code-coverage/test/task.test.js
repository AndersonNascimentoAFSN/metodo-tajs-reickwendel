import { it, describe, expect, beforeEach, afterEach, jest } from '@jest/globals'
import Task from '../src/task.js'

import { setTimeout } from 'node:timers/promises'

describe('Task Test Suite', () => {
  let _logMock
  let _task

  beforeEach(() => {
    _logMock = jest.spyOn(console, 'log').mockImplementation()
    _task = new Task()
  })

  it('should only run tasks that are due with fake timers (fast)', async () => {
    jest.useFakeTimers() // ativa o fake timer
    // Arrange, Act, Assert

    // Arrange
    const tasks = [
      { name: 'Task-Will-Run-In-5-Secs', dueAt: new Date(Date.now() + 5000), fn: jest.fn() },
      { name: 'Task-Will-Run-In-10-Secs', dueAt: new Date(Date.now() + 10000), fn: jest.fn() },
    ]

    // Act
    _task.save(tasks.at(0))
    _task.save(tasks.at(1))

    _task.run(200) // 200ms

    jest.advanceTimersByTime(4000) // 4s

    // Não devem ser executados ainda!
    expect(tasks.at(0).fn).not.toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(2000) // 2s

    // 4 + 2 = 6, então só a primeira tarefa deve executar
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(4000) // 4s

    // 4 + 2 + 4 = 10, as duas tarefas devem executar
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).toHaveBeenCalled()

    jest.useRealTimers() // desativa o fake timer
  })
})