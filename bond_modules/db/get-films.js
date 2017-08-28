const {dbPath} = require('../constants')
const low      = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const db = low(new FileSync(dbPath))

module.exports = () => db.get('films', []).value()
