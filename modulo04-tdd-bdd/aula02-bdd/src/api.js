import { randomUUID } from 'node:crypto'
import { once } from 'node:events'
import { createServer } from 'node:http'

const userDB = []

function getUserCategory(birthDay) {
  const age = new Date().getFullYear() - new Date(birthDay).getFullYear()

  if (age < 18) {
    throw new Error('User must be 18yo or older.')
  }

  if (age >= 18 && age <= 24) {
    return 'young-adult'
  }

  if (age >= 25 && age <= 50) {
    return 'adult'
  }

  if (age >= 51) {
    return 'elderly'
  }
}

const server = createServer(async (req, res) => {
  try {
    if (req.url === '/users' && req.method === 'POST') {
      const user = JSON.parse(await once(req, 'data'))
      const updatedUser = {
        ...user,
        id: randomUUID(),
        category: getUserCategory(user.birthDay),
      }
      userDB.push(updatedUser)
      res.writeHead(201, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({
        id: updatedUser.id,
        // category: updatedUser.category
      }))
      return;
    }

    if (req.url.startsWith('/users') && req.method === 'GET') {
      const [, , id] = req.url.split('/')
      const user = userDB.find(user => user.id === id)
      if (!user) {
        res.writeHead(404)
        res.end()
        return;
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(user))
      return;
    }
  } catch (error) {
    if (error.message.includes('18yo')) {
      res.writeHead(400, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({
        message: error.message
      }))
      return;
    } else {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end(error.message)
    }
  }
})

export { server }