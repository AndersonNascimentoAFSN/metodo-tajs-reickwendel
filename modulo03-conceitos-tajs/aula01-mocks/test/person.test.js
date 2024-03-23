import { describe, it, expect, jest } from '@jest/globals'
import Person from '../src/person.js'

describe('#Person Suite', () => {
  describe('#validate', () => {
    it('should throw an error if the name is not present', () => {
      const mockInvalidPerson = { cpf: '12345678900' }

      const result = () => Person.validate(mockInvalidPerson)

      expect(result).toThrow(new Error('name is required'))
    })
    it('should throw an error if the cpf is not present', () => {
      const mockInvalidPerson = { name: 'John Doe' }

      const result = () => Person.validate(mockInvalidPerson)

      expect(result).toThrow(new Error('cpf is required'))
    })
    it('should not throw an error if the person is valid', () => {
      const mockInvalidPerson = { name: 'John Doe', cpf: '12345678900' }

      const result = () => Person.validate(mockInvalidPerson)

      expect(result).not.toThrow(new Error('cpf is required'))
      expect(result).not.toThrow(new Error('name is required'))
    })
  })
  describe('#format', () => {
    it('should return a formatted person', () => {
      // AAA Pattern
      // Arrange = Prepara
      const mockPerson = { name: 'John Doe Dan', cpf: '123.456.789-00' }
      // Act = Executar
      const formattedPerson = Person.format(mockPerson)
      // Assert = Validar
      const expected = { cpf: '12345678900', firstName: 'John', lastName: 'Doe Dan' }
      expect(formattedPerson).toStrictEqual(expected)
    })
  })
  describe('#save', () => {
    it('should throw an error if the person is invalid', () => {
      const mockInvalidPerson = { name: 'John Doe' }

      const result = () => Person.save(mockInvalidPerson)

      expect(result).toThrow(new Error(`cannot save invalid person: ${JSON.stringify(mockInvalidPerson)}`))
    })

    it('should not throw an error if the person is valid', () => {
      const mockValidPerson = { firstName: 'John', cpf: '123.456.789-00', lastName: 'Doe Dan' }

      const result = () => Person.save(mockValidPerson)

      expect(result).not.toThrow(new Error(`cannot save invalid person: ${JSON.stringify(mockValidPerson)}`))
    })
  })
  describe('#process', () => {
    it('should process a valid person', () => {
      // Uma outra ideia é não retestar o que já foi testado
      // lembra dos checkpoints? Testou do caminho A ao caminho B, agora testa do caminho B ao caminho C
      // Então aqui, eu pulo o caminho A (validate), caminho B (format), e testo direto o caminho C (save), pois os caminhos anteriores já foram testados

      // Este método abaixo faz mais sentido para quando se tem iterações externas como chamadas de APi, bancos de dados, etc (que será mostrado na próxima aula)
      // Mocks são simulações de funções que você pode fazer ao testar o comportamento!!

      // AAA = Arrange, Act, Assert

      // Arrange
      const mockPerson = { name: 'John Doe Dan', cpf: '123.456.789-00' }
      jest.spyOn(Person, Person.validate.name).mockReturnValue()
      jest.spyOn(Person, Person.format.name).mockReturnValue(
        { cpf: '12345678900', firstName: 'John', lastName: 'Doe Dan' }
      )

      // Act
      const result = Person.process(mockPerson)

      // Assert
      const expected = 'ok'
      expect(result).toStrictEqual(expected)
    })
    it.skip('should process a inValid person', () => {
      // AAA = Arrange, Act, Assert

      // Arrange
      const mockPerson = { cpf: '123.456.789-00' }
      jest.spyOn(Person, Person.validate.name).mockImplementation(() => {
        throw new Error('name is required')
      })
      jest.spyOn(Person, Person.format.name).mockReturnValue(
        { cpf: '12345678900', firstName: 'John', lastName: 'Doe Dan' }
      )

      // Act
      const result = Person.process(mockPerson)

      // Assert
      const expected = 'ok'
      expect(result).toStrictEqual(expected)
    })
  })
})