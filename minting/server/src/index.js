const express = require('./services/express')
const routes = require('./routes')
const config = require('./config')

const app = express(routes)

app.listen(config.APP_PORT, () => {
  console.log(
    'Express server listening on %d, in %s mode',
    config.APP_PORT,
    config.ENV,
  )
})

module.exports = app
