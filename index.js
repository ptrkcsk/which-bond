#!/usr/bin/env node

const program = require('commander')

const coerceBondOption = require('./bond_modules/program/coerce-bond-option')
const getRandomFilm = require('./bond_modules/get-random-film')
const pkg = require('./package.json')
const wordWrap = require('./bond_modules/word-wrap')

program
  .name(pkg.name)
  .version(pkg.version)
  .option(
    '-b, --include-bonds [actors]',
    'Include one or more Bond actors, by last name. ' +
    'Examples: `-b lazenby`, `-b connery,moore`.',
    'all'
  )
  .option(
    '-B, --exclude-bonds [actors]',
    'Exclude one or more Bond actors, by last name. ' +
    'Examples: `-B niven`, `-B brosnan,niven`.',
    'none'
  )
  .parse(process.argv)

let { excludeBonds, includeBonds } = program

// Commander doesn't call the coercion function if using the default option value
excludeBonds = coerceBondOption(excludeBonds)
includeBonds = coerceBondOption(includeBonds)

const film = getRandomFilm({ excludeBonds, includeBonds })
const starring = wordWrap(`Starring ${film.bond} as James Bond`)
const overview = wordWrap(film.overview)
const title = wordWrap(film.title) + ` (${film.release_date.substring(0, 4)})`

console.log(`\n${title}\n\n${starring}\n\n${overview}\n`)
