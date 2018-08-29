const fs = require('fs')
const path = require('path')

const packageDotJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')))
const projectRoot = path.resolve(__dirname, '..')

module.exports = {
  dbPath: path.resolve(projectRoot, '.db.json'),
  projectName: packageDotJson.name,
  projectRoot: projectRoot,
  projectVersion: packageDotJson.version,
  wordWrapOptions: { width: 70 }
}
