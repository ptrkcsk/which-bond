const {dbPath}       = require('../constants')
const camelCase      = require('lodash.camelcase')
const getFilmCredits = require('../tmdb/get-film-credits')
const getFilmDetails = require('../tmdb/get-film-details')
const getFilmIds     = require('../tmdb/get-film-ids')
const low            = require('lowdb')
const FileSync       = require('lowdb/adapters/FileSync')

module.exports = (callback) => {
  const db    = low(new FileSync(dbPath))
  const films = []
  let timeout = 1000

  db.defaults({films: []})
    .write()

  getFilmIds(ids => {
    ids.forEach((id, i) => {
      // Throttle requests
      setTimeout(() => {
        const film                = {id: id}
        const desiredDetailFields = [
          'budget', 'overview', 'popularity', 'release_date', 'revenue',
          'runtime', 'status', 'title', 'vote_average', 'vote_count',
        ]

        getFilmDetails(id, details => {
          for (const detail in details) {
            if (details.hasOwnProperty(detail) && desiredDetailFields.includes(detail)) {
              film[camelCase(detail)] = details[detail]
            }
          }
          getFilmCredits(id, credits => {
            film.bondActor = credits
              .cast
              .find(member => member.character === 'James Bond')
              .name

            films.push(film)

            if (i === (ids.length - 1)) {
              films.forEach(film => {
                db.get('films')
                  .push(film)
                  .write()
              })
              callback(films)
            }
          })
        })
      }, timeout)
      timeout += 1000
    })
  })
}
