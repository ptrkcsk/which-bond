const fs    = require('fs')
const path  = require('path')
const {URL} = require('url')

const dotEnvFile     = path.resolve(__dirname, '../.env')
const packageDotJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')))

require('dotenv').config({path: dotEnvFile})

const projectRoot        = path.resolve(__dirname, '..')
const tmdb               = {}
tmdb.apiUrl              = new URL('https://api.themoviedb.org')
tmdb.apiVersion          = 3
tmdb.apiCollectionPath   = 'collection'
tmdb.apiMovieCreditsPath = (movieId) => `movie/${movieId}/credits`
tmdb.apiMoviePath        = 'movie'
/** @see {@link https://www.themoviedb.org/collection/645-james-bond-collection} */
tmdb.bondCollectionId = 645

module.exports = {
  dbPath         : path.resolve(projectRoot, '.db.json'),
  projectName    : packageDotJson.name,
  projectRoot    : projectRoot,
  projectVersion : packageDotJson.version,
  tmdb           : {
    apiKey            : process.env.TMDB_API_KEY,
    apiMovieUrl       : (id) => new URL(
      `/${tmdb.apiVersion}/${tmdb.apiMoviePath}/${id}`,
      tmdb.apiUrl.origin,
    ),
    apiMovieCreditsUrl: (id) => new URL(
      `/${tmdb.apiVersion}/${tmdb.apiMovieCreditsPath(id)}`,
      tmdb.apiUrl.origin,
    ),
    bondCollectionUrl : new URL(
      `/${tmdb.apiVersion}/${tmdb.apiCollectionPath}/${tmdb.bondCollectionId}`,
      tmdb.apiUrl.origin,
    ),
  },
  wordWrapOptions: {width: 70},
}
