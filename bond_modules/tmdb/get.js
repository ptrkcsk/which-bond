module.exports = (path, apiKey) => new Promise((resolve, reject) => {
  const https = require('https')
  const url = `https://api.themoviedb.org/3/${path}?api_key=${apiKey}`

  https.get(url, res => {
    let body = ''

    res.setEncoding('utf8')
    res.on('data', chunk => {
      body += chunk
    })
    res.on('end', () => {
      body = JSON.parse(body)
      if (res.statusCode !== 200) {
        if (body.status_message) {
          reject(Error(body.status_message))
        } else {
          reject(Error(`${res.statusCode}: ${res.statusMessage}`))
        }
      } else {
        resolve(body)
      }
    })
  })
})
