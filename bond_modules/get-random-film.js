const {projectName, wordWrapOptions} = require('./constants')
const getFilmsFromDb                 = require('./db/get-films')
const random                         = require('lodash.random')
const updateFilms                    = require('./db/update-films')
const wordWrap                       = require('word-wrap')

function filterFilms (films, options) {
  films = films.filter(film => {
    const bond = film.bondActor.toLowerCase().match(/\w+$/)[0]
    if (options.includeBonds.length) return options.includeBonds.includes(bond)
    if (options.excludeBonds.length) return !options.excludeBonds.includes(bond)
    return true
  })
  return films
}

module.exports = (options, callback) => {
  let films = getFilmsFromDb()

  if (films.length) {
    films = filterFilms(films, options)
    callback(films[random(films.length - 1)])
  } else {
    const downloadMessage = wordWrap(`Downloading Bond film data from TMDb. The data will be cached, so ${projectName} will work almost instantly next time.`, wordWrapOptions)
    console.log(`\n${downloadMessage}\n`)
    updateFilms(films => {
      films = filterFilms(films, options)
      callback(films[random(films.length - 1)])
    })
  }
}
