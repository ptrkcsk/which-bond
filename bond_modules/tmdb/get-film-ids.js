const request = require('request')
const {tmdb}  = require('../constants')

module.exports = (callback) => {
  request.get({
    uri: tmdb.bondCollectionUrl,
    qs : {
      api_key: tmdb.apiKey,
    },
  }, (error, response, body) => {
    body = JSON.parse(body)
    if (response.statusCode === 200) {
      const ids = body.parts.map(part => part.id)
      callback(ids)
    } else {
      console.error(body ? body.status_message : response.statusMessage)
    }
  })
}
