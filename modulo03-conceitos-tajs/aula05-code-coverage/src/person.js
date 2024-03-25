import z from 'zod'

const mapPersonSchema = z.object({
  name: z.string({ message: 'Name is required' }),
  age: z.coerce.number()
})

export function mapPerson(personStr) {
  const { name, age } = JSON.parse(personStr)

  const mapPerson = mapPersonSchema.safeParse({ name, age })

  if (mapPerson.success) {
    return {
      name: mapPerson.data.name,
      age: mapPerson.data.age,
      createdAt: new Date()
    }
  }

  if (mapPerson.error.name === 'ZodError') {
    console.log(mapPerson)
    console.log(mapPerson.error.format())
    // return {
    //   name: undefined,
    //   age: undefined,
    //   createdAt: new Date()
    // }
    throw new Error('Name and age are required')
  }
}