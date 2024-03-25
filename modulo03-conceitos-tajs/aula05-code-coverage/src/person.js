import z from 'zod'

const mapPersonSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  age: z.number({
    required_error: "Age is required",
    invalid_type_error: "Age must be a number",
  })
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
    return {
      name: mapPerson.error.format().name._errors.join(' '),
      age: mapPerson.error.format().age._errors.join(' '),
    }
  }
}