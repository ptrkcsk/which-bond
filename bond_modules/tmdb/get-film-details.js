const request = require('request')
const {tmdb}  = require('../constants')

module.exports = (id, callback) => {
  request.get({
    uri: tmdb.apiMovieUrl(id),
    qs : {
      api_key: tmdb.apiKey,
    },
  }, (error, response, body) => {
    body = JSON.parse(body)
    if (response.statusCode === 200) {
      callback(body)
    } else {
      console.error(body ? body.status_message : response.statusMessage)
    }
  })
}
