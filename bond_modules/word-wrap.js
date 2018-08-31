const wordWrap = require('word-wrap')

/**
 * @param {string} string
 * @return {string}
 */
module.exports = string => wordWrap(string, { width: 70 })
