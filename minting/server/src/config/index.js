const env = process.env.NODE_ENV || 'development'
const dotenv = require('dotenv-flow').config().parsed

module.exports = {
  ...dotenv,
  ENV: env,
  APP_PORT: process.env.PORT || dotenv.APP_PORT,
  SOCKET_PORT: process.env.SOCKET_PORT || dotenv.SOCKET_PORT,
}
