module.exports = () => new Promise((resolve, reject) => {
  const { dbPath } = require('./constants')
  const getApiKey = require('./get-api-key')
  const low = require('lowdb')
  const FileSync = require('lowdb/adapters/FileSync')
  const tmdbGet = require('./tmdb/get')
  const tmdbBondCollectionPath = 'collection/645'

  let apiKey
  const db = low(new FileSync(dbPath))

  getApiKey()
    .then(key => {
      apiKey = key
      return tmdbGet(tmdbBondCollectionPath, apiKey)
    })
    .then(collection => {
      const films = []
      const ids = collection.parts.map(movie => movie.id)
      let delay = 0
      ids.forEach((id, i) => {
        let currentFilm

        setTimeout(() => {
          tmdbGet(`movie/${id}`, apiKey)
            .then(film => {
              currentFilm = film
              tmdbGet(`movie/${id}/credits`, apiKey)
                .then(credits => {
                  currentFilm.credits = credits
                  films.push(film)
                  // Last time through
                  if (i === ids.length - 1) {
                    db.set('films', films).write()
                    resolve(films)
                  }
                })
                .catch(error => reject(error))
            })
            .catch(error => reject(error))
        }, delay)
        delay += 500
      })
    })
    .catch(error => reject(error))
})
