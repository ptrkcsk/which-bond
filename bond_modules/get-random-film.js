module.exports = options => new Promise(resolve => {
  const {projectName, wordWrapOptions} = require('./constants')
  const filterFilms = require('./filter-films')
  const getFilmsFromDb = require('./db/get-films')
  const random = require('lodash.random')
  const downloadFilms = require('./download-films')
  const wordWrap = require('word-wrap')

  let films = getFilmsFromDb()

  if (films.length) {
    films = filterFilms(films, options)
    resolve(films[random(films.length - 1)])
  } else {
    console.log('\n' + wordWrap(`Downloading Bond film data from TMDb. The data will be cached, so ${projectName} will work almost instantly next time.`, wordWrapOptions) + '\n')
    downloadFilms()
      .then(films => {
        films = filterFilms(films, options)
        resolve(films[random(films.length - 1)])
      })
      .catch(error => console.error(error))
  }
})
