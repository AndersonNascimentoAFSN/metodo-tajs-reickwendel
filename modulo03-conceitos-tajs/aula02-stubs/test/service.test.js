import { it, describe, expect, beforeEach, afterEach, jest } from '@jest/globals'
import fs from 'node:fs/promises'
import fsSync from 'node:fs'

import Service from '../src/service'

describe('Service Test Suite', () => {
  let _service

  beforeEach(() => {
    jest.resetModules()
    const filename = 'testfile.ndjson'
    _service = new Service({ filename: filename })
  })

  afterEach(() => {
    fs.readFile.mockRestore();
    // fsSync.existsSync.mockRestore();
  })

  describe('#read', () => {
    it('should return an empty array', async () => {
      // jest.spyOn(_service, 'read').mockResolvedValue([])
      jest.spyOn(fs, fs.readFile.name).mockReturnValue('')
      // jest.spyOn(
      //   fsSync,
      //   fsSync.existsSync.name
      // ).mockReturnValue(true)


      const users = await _service.read()
      expect(users).toEqual([])
    })
    it('should return users without password if file contains users', async () => {
      const dbData = [
        { username: 'user1', password: 'pass1', createdAt: new Date().toISOString() },
        { username: 'user2', password: 'pass2', createdAt: new Date().toISOString() },
      ]

      const fileContents = dbData
        .map(item => JSON.stringify(item).concat('\n')).join('')

      jest.spyOn(
        fs,
        fs.readFile.name
      ).mockResolvedValue(fileContents)

      jest.spyOn(
        fsSync,
        fsSync.existsSync.name
      ).mockReturnValue(true)

      const users = await _service.read()

      const expected = dbData.map(({ password, ...rest }) => ({ ...rest }))

      expect(users).toStrictEqual(expected)
    })
    it('should return users without password if file contains users error', async () => {
      const dbData = [
        { username: 'user1', password: 'pass1', createdAt: new Date().toISOString() },
        { username: 'user2', password: 'pass2', createdAt: new Date().toISOString() },
      ]

      jest.spyOn(
        fs,
        fs.readFile.name
      ).mockRejectedValue([])

      jest.spyOn(
        fsSync,
        'existsSync'
      ).mockReturnValue(false)

      const users = await _service.read()

      expect(users).toStrictEqual([])
    })
  })
})