#!/usr/bin/env node

const dotenv  = require('dotenv').config()
const random  = require('lodash.random')
const request = require('request')

/** @see {@link https://www.themoviedb.org/collection/645-james-bond-collection} */
const bondCollectionId = 645

request.get({
  uri: 'https://api.themoviedb.org/3/collection/' + bondCollectionId,
  qs : {
    api_key: process.env.TMDB_API_KEY,
  },
}, (error, response, body) => {
  body = JSON.parse(body)
  if (response.statusCode === 200) {
    const bondFilms = body.parts
    console.log(bondFilms[random(bondFilms.length - 1)].original_title)
  } else {
    console.error(body ? body.status_message : response.statusMessage)
  }
})
