const delay = require('delay')
const request = require('request-promise-native')

/**
 * @param {string} path
 * @param {string} apiKey
 * @return {Promise<Object>}
 */
const get = async (path, apiKey) => {
  let response
  const url = `https://api.themoviedb.org/3/${path}?api_key=${apiKey}`

  try {
    response = await request(url)
  } catch (e) {
    if (e.name === 'StatusCodeError' && e.statusCode === 429) {
      // Try again in 10 seconds
      await delay(10 * 1000)

      return get(path, apiKey)
    } else {
      throw e
    }
  }

  return JSON.parse(response)
}

module.exports = get
