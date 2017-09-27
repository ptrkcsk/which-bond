/**
 * @param {Object[]} cast
 */
module.exports = (cast) => {
  for (let i = 0; i < cast.length; i++) {
    if (cast[i].character === 'James Bond') return cast[i].name
  }
  return false
}
