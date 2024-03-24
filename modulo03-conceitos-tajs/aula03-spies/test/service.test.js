import { it, describe, expect, beforeEach, afterEach, jest } from '@jest/globals'
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import fsSync from 'node:fs'

import Service from '../src/service'

describe('Service Test Suite', () => {
  let _service
  const filename = 'testfile.ndjson'
  const mocked_hash_pwd = 'hashedpassword'

  beforeEach(() => {
    jest.spyOn(
      crypto,
      crypto.createHash.name
    ).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue(mocked_hash_pwd)
    })

    jest.spyOn(
      fs,
      fs.appendFile.name
    ).mockResolvedValue()

    _service = new Service({ filename: filename })
  })

  // afterEach(() => {
  //   fs.readFile.mockRestore();
  //   // fsSync.existsSync.mockRestore();
  // })

  describe('#create - spies', () => {
    it('should call appendFile with right params', async () => {
      const input = {
        username: 'user1',
        password: 'pass1'
      }
      const expectedCreatedAt = new Date().toISOString()
      // Arrange
      jest.spyOn(
        Date.prototype,
        Date.prototype.toISOString.name,
      ).mockReturnValue(expectedCreatedAt)

      // Act

      await _service.create(input)

      // Assert

      expect(crypto.createHash).toHaveBeenCalledTimes(1)
      expect(crypto.createHash).toHaveBeenCalledWith('sha256')

      const hash = crypto.createHash('sha256')
      expect(hash.update).toHaveBeenCalledWith(input.password)
      expect(hash.digest).toHaveBeenCalledWith('hex')

      const expected = JSON.stringify({
        ...input,
        createdAt: expectedCreatedAt,
        password: mocked_hash_pwd
      }).concat('\n')

      expect(fs.appendFile).toHaveBeenCalledTimes(1)
      expect(fs.appendFile).toHaveBeenCalledWith(filename, expected, 'utf-8')
    })
  })
})