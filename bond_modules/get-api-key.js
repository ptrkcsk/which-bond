module.exports = () => new Promise(resolve => {
  const {wordWrapOptions} = require('./constants')
  const getKeyFromDb = require('./db/get-api-key')
  const readline = require('readline')
  const tmdbGet = require('./tmdb/get')
  const updateKeyInDb = require('./db/update-api-key')
  const wordWrap = require('word-wrap')

  const keyFromDb = getKeyFromDb()

  function askUserForKey () {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    const question = wordWrap('\n\nPlease enter your TMDb API key. You will only have to do this once. More information can be found here: https://developers.themoviedb.org/3/getting-started.\n\nAPI Key:', wordWrapOptions)

    rl.question(question, response => {
      const submittedKey = response.trim()
      // Test the submitted key by getting the best Bond film
      tmdbGet('movie/668', submittedKey)
        .then(() => {
          rl.close()
          updateKeyInDb(submittedKey)
          resolve(submittedKey)
        })
        .catch(error => {
          console.error(wordWrap(`\n\n${error.name}: ${error.message}\n\n`, wordWrapOptions))
          rl.close()
          askUserForKey()
        })
    })
  }

  if ((typeof keyFromDb === 'undefined')) {
    askUserForKey()
  } else {
    resolve(keyFromDb)
  }
})
