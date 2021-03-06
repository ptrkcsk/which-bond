/**
 * @param {string} value
 * @return {string[]}
 */
module.exports = value => {
  const defaults = ['all', 'none']

  return defaults.includes(value) ? [] : value.split(',')
}
