import axios from 'axios'

export async function fetchAPIByPage(page = 1, counter = 1) {
  const { data } = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
  const result = data?.results?.slice(0, counter).map(item => {
    return {
      id: item.id,
      name: item.name,
      image: item.image,
    }
  })

  return result
}

export async function fetchAPIByPageWithFetch(page = 1, counter = 1) {
  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`, {
    method: 'GET',
    'content-type': 'application/json',
  })

  const data = await response.json()

  return data?.results?.slice(0, counter).map(item => {
    return {
      id: item.id,
      name: item.name,
      image: item.image,
    }
  })
}

