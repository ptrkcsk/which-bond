/**
 * @param {Object[]} films
 * @param {Object} options
 * @returns {Array}
 */
module.exports = (films, options) => films.filter(film => {
  const [bond] = film.bond.toLowerCase().match(/\w+$/)

  if (options.includeBonds.length) return options.includeBonds.includes(bond)
  if (options.excludeBonds.length) return !options.excludeBonds.includes(bond)
  return true
})
