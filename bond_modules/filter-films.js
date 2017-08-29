/**
 * @param {Object[]} films
 * @param {Object} options
 * @returns {Array}
 */
module.exports = (films, options) => {
  return films.filter(film => {
    const bond = film
      .credits
      .cast
      .filter(member => member.character === 'James Bond')[0]
      .name
      .toLowerCase()
      .match(/\w+$/)[0]

    if (options.includeBonds.length) return options.includeBonds.includes(bond)
    if (options.excludeBonds.length) return !options.excludeBonds.includes(bond)
    return true
  })
}
