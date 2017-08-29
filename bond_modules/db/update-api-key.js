module.exports = key => {
  const {dbPath} = require('../constants')
  const low = require('lowdb')
  const FileSync = require('lowdb/adapters/FileSync')

  const db = low(new FileSync(dbPath))

  return db.set('tmdbApiKey', key).write()
}
