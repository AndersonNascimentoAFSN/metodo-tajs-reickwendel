import { faker } from '@faker-js/faker';
import Service from './service.js'


const data = {
  username: faker.person.fullName(),
  password: faker.internet.password()
}
const service = new Service({
  filename: './users.ndjson'
})

await service.create(data)

const users = await service.read()
console.log('users', users)