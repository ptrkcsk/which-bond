#!/usr/bin/env node

const {projectVersion, wordWrapOptions} = require('./bond_modules/constants')
const coerceBondOption = require('./bond_modules/program/coerce-bond-option')
const getBondActor = require('./bond_modules/get-bond-actor')
const getRandomFilm = require('./bond_modules/get-random-film')
const program = require('commander')
const wordWrap = require('word-wrap')

program
  .version(projectVersion)
  .option(
    '-b, --include-bonds [actors]',
    'Include one or more Bond actors, by last name. Examples: `-b lazenby`, `-b connery,moore`. Defaults to `all`',
    'all'
  )
  .option(
    '-B, --exclude-bonds [actors]',
    'Exclude one or more Bond actors, by last name. Examples: `-B brosnan`, `-B brosnan,niven`. Defaults to `none`',
    'none'
  )
  .parse(process.argv)

// Commander doesn't call the coercion function if using the default option value
program.includeBonds = coerceBondOption(program.includeBonds)
program.excludeBonds = coerceBondOption(program.excludeBonds)

getRandomFilm({
  includeBonds: program.includeBonds,
  excludeBonds: program.excludeBonds
})
  .then(film => {
    const bondActor = getBondActor(film.credits.cast)
    const starring = wordWrap(`Starring ${bondActor} as James Bond`, wordWrapOptions)
    const overview = wordWrap(film.overview, wordWrapOptions)
    const title = wordWrap(film.title, wordWrapOptions)

    console.log(`\n${title}\n\n${starring}\n\n${overview}\n`)
  })
  .catch(error => console.error(error))
