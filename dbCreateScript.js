const faker = require('faker')
const fs = require('fs')
const _ = require('lodash')

faker.local = "en"

const db = {}

let playLists = []
let nowPlaying = []

let newReleases = []
let comingSoon = []

_.range(1,100).forEach((index) => {
  console.log(index)
  playLists.push({
    id: index,
    title: faker.lorem.word(),
    theme: faker.database.type(),
  })
  _.range(1,100).forEach((movieIndex) => {
    nowPlaying.push({
    id: (index - 1 ) * 100 + movieIndex ,
    playListId: index,
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
  })
  })
})

db['playLists'] = playLists;
db['nowPlaying'] = nowPlaying;


fs.writeFile('db.json', JSON.stringify(db))
