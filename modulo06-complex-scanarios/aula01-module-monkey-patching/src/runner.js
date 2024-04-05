import Service from "./service.js"

async function runner(item) {
  const service = new Service('heroes')
  const hero = service.createHero(item)
  const heroes = service.listHeroes()
  console.log('hero', hero)
  console.log('heroes', heroes)
}

export { runner }