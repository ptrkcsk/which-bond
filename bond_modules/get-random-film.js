const { films } = require('../db.json')
const filterFilms = require('./filter-films')
const random = require('lodash.random')

/**
 * @param {Object} options
 * @return {Object[]}
 */
module.exports = options => {
  const filtered = filterFilms(films, options)

  return filtered[random(filtered.length - 1)]
}
