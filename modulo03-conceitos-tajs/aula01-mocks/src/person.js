class Person {
  static validate(person) {
    if (!person.name) throw new Error('name is required')
    if (!person.cpf) throw new Error('cpf is required')
  }

  static format(person) {
    const [firstName, ...lastName] = person.name.split(' ')

    return {
      cpf: person.cpf.replace(/\D/g, ''),
      firstName,
      lastName: lastName.join(' ')
    }
  }

  static save(person) {
    if(!['cpf', 'firstName', 'lastName'].every(prop => person[prop])) {
      throw new Error(`cannot save invalid person: ${JSON.stringify(person)}`)
    }
    // ... banco de dados, api, etc
    console.log('registering person with success', person)
  }

  static process(person) {
    this.validate(person)
    const personFormatted = this.format(person)
    this.save(personFormatted)
    return 'ok'
  }
}

// Person.process({
//   name: 'John Doe',
//   cpf: '12345678900'
// })

export default Person