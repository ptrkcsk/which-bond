module.exports = (value) => {
  return ['all', 'none'].includes(value) ? [] : value.split(',')
}
