import { describe, it, expect, jest, beforeAll, afterAll } from '@jest/globals'

import { server } from '../src/api.js'

/* 
  Regras de negócios:

  - Deve cadastrar usuários e definir uma categoria onde:
    - Jovens Adultos:
      - Usuários de 18-25
    - Adultos:
      - Usuários de 26-50
    - Idosos:
      - 51+
    - Menor
      - Estoura um erro!
*/

describe('API Users E2E Suite', () => {
  function waitForServerStatus(server) {
    return new Promise((resolve, reject) => {
      server.once('error', (err) => reject(err))
      server.once('listening', () => resolve())
    })
  }

  function createUser(data) {
    return fetch(`${_testServerAddress}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  async function findUserById(id) {
    const user = await fetch(`${_testServerAddress}/users/${id}`, {
      method: 'GET',
    })

    return user.json()
  }

  let _testServer
  let _testServerAddress

  beforeAll(async () => {
    _testServer = server.listen();

    await waitForServerStatus(_testServer)

    const serverInfo = _testServer.address()
    _testServerAddress = `http://localhost:${serverInfo.port}`

  })

  afterAll(done => {
    server.closeAllConnections()
    _testServer.close(done)
  })

  it('should register a new user with young-adult category', async () => {
    const expectedCategory = 'young-adult'
    // Importante pois o ano que vem o teste pode quebrar. Sempre que estiver usando datas, sempre mockar o tempo!

    jest.useFakeTimers({
      now: new Date(2024, 1 - 1 , 1)
    })

    const response = await createUser({
      name: 'Xuxa da Silva',
      birthDay: '2004-01-01' // 21 anos
    })

    expect(response.status).toBe(201)

    const result = await response.json()
    expect(result.id).not.toBeUndefined()

    const user = await findUserById(result.id)

    expect(user.category).toBe(expectedCategory)
  })
  it.todo('should register a new user with adult category')
  it.todo('should register a new user with senior category')
  it('should throw new error when registering a under-age user', async () => {
    jest.useFakeTimers({
      now: new Date(2024, 1 - 1 , 1)
    })

    const response = await createUser({
      name: 'Xuxa da Silva',
      birthDay: '2020-01-01' // 4 anos
    })

    expect(response.status).toBe(400)

    const result = await response.json()

    expect(result.message).toBe('User must be 18yo or older.')
  })
})